import axios from 'axios';

const instance = axios.create({
    timeout: 5000
})

instance.interceptors.request.use(
    config => {
      console.log(config);
      return config
    }
    , error => {
      console.log(error);
      return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    response => {
      console.log(response);
      return response;
    }
    , error => {
      console.log(error);
      return Promise.reject(error);
    }
);

const getProductList = (rowsPerPage, pageNo, dshopNo, pdSortCd) => {
    return instance.get('/p/display/category/seltCatePdWishListAjax?pdSortCd=' + pdSortCd + '&pageNo=' + pageNo + '&rowsPerPage=' + rowsPerPage + '&dshopNo=' + dshopNo);
}

const setCartInfo = cartData => {
    return instance.post('/api/setCartList',cartData);
}

const getCartCnt = mbNo =>{
    return instance.get('/api/getOmcartCount', {data:{mbNo}});
}

const getCartList = mbNo => {
    // return instance.post('/api/getCartFullList', mbNo);
    return instance.post('/api/getCartListAfterGroupby', mbNo);
}

const delCartInfo = cartInfo => {
    return instance.post('./api/delCartInfo', cartInfo);
}

const delAllCartInfo = cartInfo => {
    return instance.post('./api/delAllCartInfo', cartInfo);
}

const updateOmCartOdQty = data => {
    return instance.post('./api/updateOmCartOdQty', data);
}

export {
    getProductList
    , setCartInfo
    , getCartCnt
    , getCartList
    , delCartInfo
    , delAllCartInfo
    , updateOmCartOdQty
}