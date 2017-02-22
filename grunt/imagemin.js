module.exports = {
    default: {
        options: { 
            optimizationLevel: 5,
        },
        files: [{
            expand: true, 
            cwd: 'src/_attachments/images',
            src: ['**/*.{png,jpg,gif}'], 
            dest: 'src/_attachments/dist/images'
        }]
    }
}