const cart = {
  template: `
  <div>
    <div class="overlay"></div>
    <div class="regBox">
      <button class="x-close" @click="closebtn">x</button>
      <h5 style="margin: 30px 0 40px;">
        <strong>Cart List</strong>
      </h5>
      <div>
        <p v-if="!carts || carts.length === 0" style="margin: 10%; text-align: center;"> No items </p>
        <div class="cart-list" v-for="cart in listCart" v-else>
        <p> {{cart[0].name}}   x{{cart.length}} <strong class="del-item" @click="deleteItem(cart)">x</strong></p>
        </div>
      </div>

      <button class="reg-btn" style="float: right" @click="checkout">Checkout</button>
    </div>
  </div>
  `,
  data: function() {
    return {
      isLogin: false,
      baseUrl: "http://localhost:3000",
      notif: "",
      isCloseModal: true
    };
  },
  props: ["carts"],
  methods: {
    deleteItem(item) {
      //... to be continued
    },
    checkout() {
      let token = localStorage.getItem("token");
      let itemlist = localStorage.getItem("cartArray");

      axios({
        method: "POST",
        url: this.baseUrl + "/api/transactions",
        data: {
          token: token,
          itemlist: itemlist
        }
      })
        .then(data => {
          console.log(data)
        })
        .catch(err => {
          this.notif = err.response.data.message;
        });
    },
    closebtn() {
      this.isCloseModal = false;
      this.$emit("giveStatCart", this.isCloseModal);
    }
  },
  created() {},
  computed: {
    listCart: function() {
      function groupBy(array, fn) {
        let groups = {};
        array.forEach(function(o) {
          let group = JSON.stringify(fn(o));
          groups[group] = groups[group] || [];
          groups[group].push(o);
        });
        return Object.keys(groups).map(function(group) {
          return groups[group];
        });
      }

      let list = this.carts;
      let result = groupBy(list, function(item) {
        item.count = item.length;
        return item;
      });

      console.log(result);
      return result;
    }
  },
  watch: {}
};
