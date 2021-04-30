<template>
    <div>
        <!-- <form action="/login" method="POST">
            <input name="username" placeholder="아이디를 입력하세요."/>
            <input name="password" type="password" placeholder="비밀번호를 입력하세요."/> -->
        <form @submit.prevent="onSubmit(username, password)" method="POST">
            <input v-model="username" id="username" placeholder="아이디를 입력하세요."/>
            <input v-model="password" id="password" type="password" placeholder="비밀번호를 입력하세요."/>
            
            <button type="submit">로그인</button>
        </form>
    </div>
</template>

<script>


export default {
    name: "Login"
    , data(){
        return {
            username: ""
            , password: ""
        }
    }
    , created(){
        sessionStorage.clear();
    }
    , methods: {
        onSubmit(username, password){
            this.$log.debug(username +"/" + password);
            this.$store.dispatch('LOGIN', {username, password});
        }
    }
}
</script>
