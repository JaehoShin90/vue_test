import axios from 'axios';

const instance = axios.create({
    timeout: 5000
    
})

instance.interceptors.request.use(
    config => {
        // console.log(config);
        return config
    }
    , error => {
        // console.log(error);
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    response => {
        // console.log(response);
        return response;
    }
    , error => {
        // console.log(error);
        return Promise.reject(error);
    }
);

const getAuthorization = (param = {}) => {
    const result = {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("token")
        }
    }
    Object.assign(result, param);
    return result;
}

const getProductList = (rowsPerPage, pageNo, dshopNo, pdSortCd) => {
    return instance.get('/p/display/category/seltCatePdWishListAjax?pdSortCd=' + pdSortCd + '&pageNo=' + pageNo + '&rowsPerPage=' + rowsPerPage + '&dshopNo=' + dshopNo);
}

const setCartInfo = cartData => {
    // document.cookie.match
    return instance.post('/api/setCartList',cartData);
}

const getCartCnt = (mbNo) =>{
    return instance.get('/api/getOmcartCount', getAuthorization({params :{mbNo:mbNo}}));
}

const getCartList = mbNo => {
    // return instance.get('/api/getCartList', {params:{mbNo:mbNo});
    return instance.get('/api/getCartListParallel', getAuthorization({params :{mbNo:mbNo}}));
}

const delCartInfo = cartInfo => {
    return instance.post('/api/delCartInfo', cartInfo, getAuthorization());
}

const delAllCartInfo = cartInfo => {
    return instance.post('/api/delAllCartInfo', cartInfo, getAuthorization());
}

const updateOmCartOdQty = data => {
    return instance.post('/api/updateOmCartOdQty', data, getAuthorization());
}

const login = (username, password) => {
    return instance.post('/login', {userId:username, password:password});
}

export {
    getProductList
    , setCartInfo
    , getCartCnt
    , getCartList
    , delCartInfo
    , delAllCartInfo
    , updateOmCartOdQty
    , login
}