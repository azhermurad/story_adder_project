const moment = require('moment');
module.exports = {
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + ' '
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        }
        return str;
    },
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    dateFormat: function (da, month) {
        const date = new Date(da);
        const momentDate = moment(date.toISOString())
        if (month === 'month') {
            return moment(momentDate).format('MMMM Do YYYY')
        }
        const m = moment(momentDate).startOf('hour').fromNow();
        return m;
    },
    select: function (selected, options) {
        return options.fn(this)
            .replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"')
            .replace(new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
    },
    compare: function (a, b, opts) {
        if(a.toString() == b.toString()) {
            return opts.fn(this)
        } else {
            return opts.inverse(this)
        }
    }
}