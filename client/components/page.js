Vue.component("content-page", {
  components: {
    "modal-login": login,
    "modal-register": register,
    "modal-cart": cart
  },
  template: `
  <div>
    <nav class="main-menu">
      <ul>
          <li @click="getHome">
            <i class="fas fa-stroopwafel"></i><span class="nav-text">Home</span>
          </li>
          <li @click="getFemaleWears">
            <i class="fa fax-dress"></i><span class="nav-text">Women's Wears</span>
          </li>
          <li @click="getMaleWears">
            <i class="fa fax-necktie"></i><span class="nav-text">Men's Wears</span>
          </li>
          <li @click="getShirts">
            <i class="fa fax-t-shirt"></i><span class="nav-text">Shirts</span>
          </li>
          <li @click="getPants">
            <i class="fa fax-jeans"></i><span class="nav-text">Pants</span>
          </li>
          <li @click="getFemaleShoes">
            <i class="fa fax-high-heeled-shoe"></i><span class="nav-text">Women's Shoes</span>
          </li>
          <li @click="getMaleShoes">
            <i class="fa fax-mans-shoe"></i><span class="nav-text">Men's Shoes</span>
          </li>
          <li @click="clickCart" v-if="isLogin">
            <i class="fa fa-cart-plus"></i><span class="nav-text">Transactions</span>
          </li>
      </ul>

      <ul class="logout" v-if="!isLogin">
          <li @click="clickReg">
            <i class="fas fa-user-plus"></i>
            <span class="nav-text">
                Register
            </span>  
          </li>
          <li @click="clickLog">
            <i class="fas fa-sign-in-alt"></i>
            <span class="nav-text">
                Login
            </span>  
          </li>  
      </ul>
      <ul class="logout" v-if="isLogin">
          <li @click="logout">
          <i class="fas fa-sign-out-alt"></i>
            <span class="nav-text">
                Logout
            </span>  
          </li>  
      </ul>

      <modal-register v-if="isOpenReg == true" @giveStatReg="openRegBtn"></modal-register>
      <modal-login v-if="isOpenLog == true" @giveStatLog="openLogBtn"></modal-login>
      <modal-cart v-if="isOpenCart == true" @giveStatCart="openCartBtn" v-bind:carts="statStorage()"></modal-cart>
    </nav>
    
    <div class="container" id="app-list">
      <div class="wrap-loader" v-if="items.length === 0"><div class="circle-loader"></div></div>
      <div class="col-4" v-else v-for="item in items">
        <article class="list--item">
          <figure>
            <img :src="item.imageurl" alt="">
            <header>
              <div class="floater">
              <i class="fa fa-cart-plus" v-if="isLogin" @click="addTransaction(item)"></i>
              </div>
              <h2> {{item.name}} </h2>
            </header>
            <figcaption>
            {{item.desc}}
            <p> Rp {{item.price}}</p>
            </figcaption>
          </figure>
        </article>
      </div>
    </div>    
  </div>
  `,
  data() {
    return {
      isOpenReg: false,
      isOpenLog: false,
      isOpenCart: false,
      isLogin: false,
      items: [],
      carts: [],
      baseUrl: "http://localhost:3000"
    };
  },
  methods: {
    clickReg() {
      this.isOpenReg = true;
    },
    clickLog() {
      this.isOpenLog = true;
    },
    clickCart() {
      this.isOpenCart = true;
    },
    openRegBtn(value) {
      this.isOpenReg = value;
    },
    openLogBtn(value) {
      this.isOpenLog = value;
    },
    openCartBtn(value) {
      this.isOpenCart = value;
    },
    logout() {
      localStorage.clear();
      this.isLogin = false;
    },
    addTransaction(item) {
      this.carts.push(item);
      localStorage.setItem("cartArray", JSON.stringify(this.carts));
    },
    getHome() {
      axios
        .get(this.baseUrl + "/api/items")
        .then(response => {
          this.items = response.data.items;
        })
        .catch(err => {
          console.log("error di sini", err.response);
        });
    },
    getFemaleWears() {
      axios
        .get(this.baseUrl + "/api/categories/5b9dfcfa857dbd49ec67cca4")
        .then(response => {
          this.items = response.data.categories.itemlist;
          console.log("masukin yang ini", response.data.categories.itemlist);
        })
        .catch(err => {
          console.log("error di sini", err.response);
        });
    },
    getMaleWears() {
      axios
        .get(this.baseUrl + "/api/categories/5b9dfcf2857dbd49ec67cca3")
        .then(response => {
          this.items = response.data.categories.itemlist;
          console.log("masukin yang ini", response.data.categories.itemlist);
        })
        .catch(err => {
          console.log("error di sini", err.response);
        });
    },
    getShirts() {
      axios
        .get(this.baseUrl + "/api/categories/5b991696c2c7ac191d5bdf0b")
        .then(response => {
          this.items = response.data.categories.itemlist;
          console.log("masukin yang ini", response.data.categories.itemlist);
        })
        .catch(err => {
          console.log("error di sini", err.response);
        });
    },
    getPants() {
      axios
        .get(this.baseUrl + "/api/categories/5b9dfcc2857dbd49ec67cca0")
        .then(response => {
          this.items = response.data.categories.itemlist;
          console.log("masukin yang ini", response.data.categories.itemlist);
        })
        .catch(err => {
          console.log("error di sini", err.response);
        });
    },
    getFemaleShoes() {
      axios
        .get(this.baseUrl + "/api/categories/5b9dfcd8857dbd49ec67cca1")
        .then(response => {
          this.items = response.data.categories.itemlist;
          console.log("masukin yang ini", response.data.categories.itemlist);
        })
        .catch(err => {
          console.log("error di sini", err.response);
        });
    },
    getMaleShoes() {
      axios
        .get(this.baseUrl + "/api/categories/5b9dfce3857dbd49ec67cca2")
        .then(response => {
          this.items = response.data.categories.itemlist;
          console.log("masukin yang ini", response.data.categories.itemlist);
        })
        .catch(err => {
          console.log("error di sini", err.response);
        });
    },
    statStorage() {
      let cartArray = localStorage.getItem("cartArray");
      if (cartArray) {
        return this.carts = JSON.parse(cartArray);
      } else {
        return []
      }
    }
  },
  created() {
    let datatoken = localStorage.getItem("token");
    if (datatoken) {
      this.isLogin = true;
    }
  },
  mounted() {
    this.getHome();
  },
  watch: {}
});
