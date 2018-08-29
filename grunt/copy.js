module.exports = {
    default: {
        expand: true,
        cwd: 'src/_attachments/',
        src: [
            'fonts',
            'index.html',
            'google7f311b514ca2b68b.html'
        ],
        dest: 'surge/'
    },
    dist: {
        expand: true,
        cwd: 'src/_attachments/dist',
        src: [
            'images/*',
            'main.min.css',
            'main.min.js'
        ],
        dest: 'surge/'
    }
};