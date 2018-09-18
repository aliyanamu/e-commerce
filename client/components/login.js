const login = {
  template : 
  `
  <div>
    <div class="overlay"></div>
    <div class="regBox">
      <button class="x-close" @click="closebtn">x</button>
      <h5 style="margin: 30px 0 40px;">
        <strong>Login</strong>
        </h5>
        <p class="err-notif">{{ this.notif }}</p>
      <div class="form">

          <div class="md-form">
            <label for="formreg1"><i class="fa fa-envelope"></i>Email</label>
            <input v-model="email" type="email" id="formreg1" class="form-control">
          </div>

          <div class="md-form">
            <label for="formreg4"><i class="fas fa-key"></i>Password</label>
            <input v-model="password" type="password" id="formreg4" class="form-control">
          </div>

        </div>
        <button class="reg-btn" style="float: right" @click="login">Login</button>
    </div>
  </div>
  `,
  data: function(){
      return {
          email : '',
          password : '',
          isLogin: false,
          baseUrl: 'http://localhost:3000',
          notif: '',
          isCloseModal: true
      }   
  },
  methods: {
      login() {
          axios({
              method: 'POST',
              url: this.baseUrl + "/api/users/login",
              data: {
                  email : this.email,
                  password : this.password
              }   
          })
          .then((data) => {
            let token = data.data.token
              localStorage.setItem('token', token)
            this.notif = 'Login success'
            this.isLogin = true
            this.$emit('datatoken', this.isLogin)
              location.reload()
          })
          .catch((err) => {
              this.notif = err.response.data.message
              this.isLogin = false
          })
      },

      closebtn() {
          this.isCloseModal = false
          this.$emit("giveStatLog", this.isCloseModal)
      },
     
  },
  watch: {
  }
}