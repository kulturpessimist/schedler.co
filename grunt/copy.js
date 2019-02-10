module.exports = {
    default: {
        expand: true,
        cwd: 'src/',
        src: [
            'fonts/**',
            'index.html',
            'robots.txt',
            'google7f311b514ca2b68b.html'
        ],
        dest: 'build/'
    },
    images: {
        expand: true,
        cwd: 'src/',
        src: [
            'images/*'
        ],
        dest: 'build/'
    }
};