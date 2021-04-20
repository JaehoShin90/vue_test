// 선언부분
var computedMixin = {
    computed: {
        setComma(){
            return (val) => {
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }
    }
}

export {
    computedMixin
}