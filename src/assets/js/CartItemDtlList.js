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
            if(data.odQty + 1 > data.itmByMaxPurPsbJsn.maxPurQty){
                alert("최대 " + data.itmByMaxPurPsbJsn.maxPurQty + "개 까지 구매가 가능한 상품입니다.");
                return false;
            }
            data.odQty = data.odQty + 1;
            // 업체별 전체 금액 계산
            this.setVndrAmnt(data, data.slPrc);
            this.updateOmCartOdQty(data);
        }
        , odQtyMinus(data){
            if(data.odQty <= 1){
                alert("최소 1개 이상부터 구매가 가능합니다.");
                return false;
            }
            data.odQty = data.odQty - 1;
            // 업체별 전체 금액 계산
            this.setVndrAmnt(data, -1 * data.slPrc);
            this.updateOmCartOdQty(data);
        }
        , updateOmCartOdQty(data){
            if(data.odQty > 0){
                updateOmCartOdQty(data)
                .then((response) => {
                    if(response.status == 200){
                        console.log("정상변경");
                    }
                })
                .catch((err) => console.log(err));
            }
        }
        , keyDownOdQty(event, data){
            this.setVndrAmnt(data, -1 * data.odQty * data.slPrc);
            if(data.itmByMaxPurPsbJsn.maxPurQty < event.target.value){
                event.target.value = data.itmByMaxPurPsbJsn.maxPurQty;
                data.odQty = data.itmByMaxPurPsbJsn.maxPurQty;
            }else{
                data.odQty = event.target.value;
            }
            // 업체별 전체 금액 계산
            this.setVndrAmnt(data, data.odQty * data.slPrc);
            updateOmCartOdQty(data);
        }
        , keyUpOdQty(event, data){
            if(event.key == "Backspace"){
                return false;
            }
            if(data.odQty <= 0){
                data.odQty = 1;
                // 업체별 전체 금액 계산
                this.setVndrAmnt(data, data.odQty * data.slPrc);
                updateOmCartOdQty(data);
            }
        }
        , clkDeleteCart(data){
            console.log(data.cartSn);
            delCartInfo(data).then(() => this.updateCartList(data.cartSn))
            .catch(error => console.log(error));
        }
        , updateCartList(cartSn){
            this.dtlList.splice(cartSn, 1)
            if(this.dtlList.length == 0){
                this.$emit("updateCartList", cartSn);
            }
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