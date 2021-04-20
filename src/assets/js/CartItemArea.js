import {
    getCartList
    , delAllCartInfo
} from '../../api/Product.js'

var CartItemArea = {
    methods: {
        getCartList(){
            getCartList({mbNo : this.$store.state.mbNo})
            .then((response) => {
                this.isLoading = false;
                this.cartList = (response.data ? response.data : []);
                this.cartList.forEach(() => {
                    this.vndrAmntInfo.push({
                        amnt : 0
                        , cnt : 0
                    });
                });
                // returnCode가 200이 아니면 상품정보 및 업체정보가 없어 200인 데이터만 표시
                var i = 0;
                while(i < this.cartList.length){
                    var j = 0;
                    while(j < this.cartList[i].cartList.length){
                        if(this.cartList[i].cartList[j].returnCode != "200"){
                            this.cartList[i].cartList.splice(j,1);
                        }else{
                            j++;
                        }
                    }
                    if(this.cartList[i].cartList.length == 0){
                        this.cartList.splice(i, 1);
                    }else{
                        i++;
                    }
                    
                }
            })
            .catch(error => console.log(error));
        }
        , updateCartList(cartSn){
            this.cartList.splice(cartSn, 1);
        }
        , setVndrAllchk(trNum, allChk){
            this.$refs['cart0_' + trNum][0].setClkEventStack("setVndrAllchk");
            if(allChk){
                this.vndrAllChk.push(trNum);
            }else if(this.vndrAllChk.indexOf(trNum) > -1){
                this.vndrAllChk.splice(this.vndrAllChk.indexOf(trNum), 1);
            }
        }
        , clkVndrAll(trNum){
            this.$refs['cart0_' + trNum][0].setClkEventStack("");
        }
        , clkDelChk(){
            var delTarget = [];
            for(var i = 0 ; i < this.cartList.length ; i++){
                for(var j = 0 ; j < this.$refs["cart0_" + i][0].itemChk.length ; j++){
                    delTarget.push({"cartSn":this.$refs["cart0_" + i][0].itemChk[j]});
                }
            }
            console.log(delTarget);
            delAllCartInfo(delTarget)
            .then(() => {
                alert("선택하신 상품이 삭제되었습니다.");
                this.allChk = false;
                this.getCartList();
            })
            .catch(error => console.log(error));
        }
        , setVndrTotalAmnt(amnt, index){
            if(amnt == ""){
                this.$emit("setTotalAmnt", -1 * this.vndrAmntInfo[index].amnt);
                this.vndrAmntInfo[index].amnt = 0;
            }else{
                this.$emit("setTotalAmnt", amnt);
                this.vndrAmntInfo[index].amnt += amnt;
            }
        }
        , setVndrTotalCnt(cnt, index){
            if(cnt == ""){
                this.$emit("setTotalCnt", -1 * this.vndrAmntInfo[index].cnt);
                this.vndrAmntInfo[index].cnt = 0;
            }else{
                this.$emit("setTotalCnt", cnt);
                this.vndrAmntInfo[index].cnt += cnt;
            }
        }
    }
}

export {
    CartItemArea
}