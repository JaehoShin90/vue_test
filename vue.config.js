module.exports = {
    devServer:{
        proxy: {
            '/api' :{
                target: 'http://localhost:8080'
            }
            ,'/p/display' : {
                target: 'https://www.lotteon.com'
            }
        }
        , port : 8081
    }
}