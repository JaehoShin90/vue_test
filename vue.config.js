module.exports = {
    devServer:{
        proxy: {
            '/login' :{
                target: 'http://localhost:8080'
            }
            , '/logout' :{
                target: 'http://localhost:8080'
            }
            , 'http://localhost:8081/LoginPage' :{
                target: 'http://localhost:8080/LoginPage'
            }
            , '/api' :{
                target: 'http://localhost:8080'
            }
            ,'/p/display' : {
                target: 'https://www.lotteon.com'
            }
        }
        , port : 8081
    }
}