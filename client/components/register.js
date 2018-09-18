const register = {
  template: 
  `
  <div>
    <div class="overlay"></div>
    <div class="regBox">
      <button class="x-close" @click="closebtn">x</button>
      <h5 style="margin: 30px 0 40px;">
        <strong>Register</strong>
      </h5>
        <div class="form">

          <div class="md-form">
            <label for="formreg2" class=""><i class="fa fa-user"></i>Name</label>
            <input v-model="name" type="text" id="formreg2" class="form-control">
          </div>


          <div class="md-form">
            <label for="formreg1"><i class="fa fa-envelope"></i>Email</label>
            <input v-model="email" type="email" id="formreg1" class="form-control">
          </div>

          <div class="md-form">
            <label for="formreg4"><i class="fas fa-key"></i>Password</label>
            <input v-model="password" type="password" id="formreg4" class="form-control">
          </div>

          <div class="md-form">  
            <label for="formreg3"><i class="fas fa-phone"></i>Phone</label>
            <input v-model="phone" type="text" id="formreg3" class="form-control">
          </div>

        </div>
        <button class="reg-btn" style="float: right" @click="register">Join</button>
    </div>
  </div>
  `,
  data: function(){
      return {
          name : '',
          email : '',
          phone : '',
          password : '',
          isCloseModal : true
      }
  },
  methods: {
      register() {
          let data = {
              name : this.name,
              email : this.email,
              phone : this.phone,
              password : this.password
          }
          axios({
              method: 'POST',
              url: `http://localhost:3000/api/users/`,
              data
          })
          .then(function(response){
              location.reload()
          })
          .catch(function(err){
              console.log(err.response.data.err.errors)
          })

      },

      closebtn(){
          this.isCloseModal = false
          this.$emit("giveStatReg", this.isCloseModal)
      }
  }
}