const express = require('express');
const router = express.Router();
const { authorize } = require('../helper/auth');
const Story = require('../model/story')

router.get("/stories", async (req, res) => {
    const story = await Story.find({ status: "public" }).populate('user')
    res.render('stories/index', {
        story: story
    })
});

router.get("/stories/add", authorize, (req, res) => {
    res.render('stories/add')
});
// router.get("/stories/edit/:id",
//     (req, res) => {
//         res.render('stories/edit')
//     });

router.get('/stories/show/:id', async (req, res) => {
    const story = await Story.findOne({ _id: req.params.id }).populate('user').populate('comments.userid');
    if(story.status === 'public'){
        res.render('stories/show', { story: story });
    }else {
        if(req.user){
            if(req.user.id.toString()=== story.user.id.toString()){
             return    res.render('stories/show', { story: story });

            }else {
              return  res.redirect('/stories')
            }
        }
        res.redirect('/stories')
    }

})
router.get('/stories/edit/:id', authorize, async (req, res) => {
    const story = await Story.findOne({ _id: req.params.id });
    if (story.user._id.toString() == req.user._id.toString()) {
        res.render('stories/edit', { story: story });

    } else {
        res.redirect('/dashboard')
    }


})
router.put("/stories/:id", authorize, async (req, res) => {
    const story = await Story.findOne({ _id: req.params.id });
    let allowedcomment;
    if (req.body.allowedcomment) {
        allowedcomment = true;
    } else allowedcomment = false;

    story.title = req.body.title;
    story.description = req.body.description;
    story.status = req.body.status;
    story.allowedcomment = allowedcomment
    await story.save()
    res.redirect('/dashboard')
})
router.delete('/stories/:id', authorize, async (req, res) => {
    await Story.remove({ _id: req.params.id });
    res.redirect('/dashboard');
})

// router for the delete of the story in the database
router.post("/stories", authorize, async (req, res) => {
    let allowedcomment;
    // const error = [];
    if (req.body.allowedcomment) {
        allowedcomment = true;
    } else allowedcomment = false;
    if (!req.body.title) {
        error.push({ error: "you must provide the title" })
    }
    //  if(error.length>0){
    //      console.log("errors are accurs")
    //  }
    const newStory = {
        title: req.body.title,
        status: req.body.status,
        description: req.body.description,
        allowedcomment: allowedcomment,
        user: req.user._id
    };
    const story = await new Story(newStory)
    await story.save()
    // console.log(story)

    res.redirect(`/stories/show/${story._id}`)
})
// stories comment section 
router.post("/stories/comment/:id", async (req, res) => {
    console.log(req.body)
    const story = await Story.findOne({ _id: req.params.id });
    const comment = {
        commentbody: req.body.comment,
        userid: req.user._id
    }
    story.comments.unshift(comment);
    await story.save();
    res.redirect(`/stories/show/${req.params.id}`)
})

// show the post of specfic user  
router.get("/stories/user/:id", authorize ,async (req, res) => {
    const story = await Story.find({user:req.params.id, status: 'public'}).populate('user')
    res.render('stories/index', {
        story: story
    })
})
// get  all the post of login user 
router.get('/stories/my', authorize ,async  (req, res) => {
    const story = await Story.find({user:req.user.id, status: 'public'}).populate('user');
    res.render('stories/index', {
        story :story
    })
})
module.exports = router;

