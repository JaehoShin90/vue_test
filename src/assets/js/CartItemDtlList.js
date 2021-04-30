import _ from 'lodash';
import {
    delCartInfo
    , updateOmCartOdQty
} from '../../api/Product.js'

var cidlMixin = {
    methods:{
        isPlusDisabled(data){
            return (data.odQty == data.itmByMaxPurPsbJsn.maxPurQty? "disabled" : "");
        }
        , isMinusDisabled(data){
            return (data.odQty == 1 ? "disabled" : "");
        }
        , odQtyPlus(data){
            if(data.itmByMaxPurPsbJsn.maxPurQty && Number(data.odQty) + 1 > data.itmByMaxPurPsbJsn.maxPurQty){
                alert("최대 " + data.itmByMaxPurPsbJsn.maxPurQty + "개 까지 구매가 가능한 상품입니다.");
                return false;
            }
            data.odQty = Number(data.odQty) + 1;
            // 업체별 전체 금액 계산
            this.setVndrAmnt(data, data.slPrc);
            console.log("수량 증가");
            this.updateOmCartOdQty(data);
        }
        , odQtyMinus(data){
            if(Number(data.odQty) <= 1){
                alert("최소 1개 이상부터 구매가 가능합니다.");
                return false;
            }
            data.odQty = Number(data.odQty) - 1;
            // 업체별 전체 금액 계산
            this.setVndrAmnt(data, -1 * data.slPrc);
            console.log("수량 감소");
            this.updateOmCartOdQty(data);
        }


        /**
         * debounce 적용 방법 
         * 1. debounce
         * 1.1. 설치 : npm i debounce --s
         * 1.2. 사용
         * methods:{
         *  함수명 : debounce(function(파라미터){함수내용}) 
         * }
         * 
         * 2. lodash
         * 2.1. 설치 : npm i lodash --s
         * 2.2. 사용
         * methods:{
         *  함수명 : _.debounce(function(파라미터){함수내용}) 
         * }
         * 
         */
        // , updateOmCartOdQty: debounce(function(data){
        , updateOmCartOdQty: _.debounce(function(data){
        // , updateOmCartOdQty: _.throttle(function(data){
            console.log("이벤트 호출");
            console.log("data" + data);
            if(data.odQty > 0){
                updateOmCartOdQty(data)
                .then((response) => {
                    if(response.status == 200){
                        this.$log.debug("정상변경");
                    }
                })
                .catch((err) => this.$log.error(err));
            }
        }, 500)
        , keyDownOdQty(event, data){
            this.setVndrAmnt(data, -1 * data.odQty * data.slPrc);
            if(data.itmByMaxPurPsbJsn.maxPurQty && data.itmByMaxPurPsbJsn.maxPurQty < event.target.value){
                event.target.value = Number(data.itmByMaxPurPsbJsn.maxPurQty);
                data.odQty = Number(data.itmByMaxPurPsbJsn.maxPurQty);
            }else{
                data.odQty = Number(event.target.value);
            }
            // 업체별 전체 금액 계산
            this.setVndrAmnt(data, data.odQty * data.slPrc);
            this.updateOmCartOdQty(data);
        }
        , keyUpOdQty(event, data){
            if(event.key == "Backspace"){
                return false;
            }
            if(data.odQty <= 0){
                data.odQty = 1;
                // 업체별 전체 금액 계산
                this.setVndrAmnt(data, data.odQty * data.slPrc);
                this.updateOmCartOdQty(data);
            }
        }
        , clkDeleteCart(data){
            this.$log.debug(data.cartSn);
            delCartInfo(data)
            .then(() => {
                alert("선택하신 상품이 삭제되었습니다.");
                this.$emit("updateCartList");
                this.$store.dispatch('GET_MMBR_CART_CNT');
            })
            .catch(error => this.$log.error(error));
        }
        , chkClick(dtl){
            this.isItemChkFlag = true;
            // 업체별 전체 금액 계산
             if(this.itemChk.indexOf(dtl.cartSn) < 0){
                this.$emit("setVndrTotalAmnt",(dtl.odQty * dtl.slPrc),this.trNum - 1);
                this.$emit("setVndrTotalCnt", 1,this.trNum - 1);
            }else{
                this.$emit("setVndrTotalAmnt",(dtl.odQty * dtl.slPrc * -1),this.trNum - 1);
                this.$emit("setVndrTotalCnt", -1,this.trNum - 1);
            }
        }
        , setClkEventStack(data){
            if(data === ""){
                this.clkEventStack = [];
            }else{
                this.clkEventStack.push(data);
            }
            
        }
        , setVndrAmnt(data, amnt){
            // 업체별 전체 금액 계산
            if(this.itemChk.indexOf(data.cartSn) >= 0){
                this.$emit("setVndrTotalAmnt",amnt,this.trNum - 1);
            }
        }
    }
}

export {
    cidlMixin
}