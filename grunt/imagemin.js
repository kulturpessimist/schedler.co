module.exports = {
    default: {
        options: { 
            optimizationLevel: 5,
        },
        files: [{
            expand: true, 
            cwd: 'src/images',
            src: ['**/*.{png,jpg,svg}'], 
            dest: 'surge/images'
        }]
    }
}