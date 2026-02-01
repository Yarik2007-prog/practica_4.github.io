export const login = {
    data: function (){
        return {
            img: 1,
            hs: 0,
            parent:''
        }
    },

    mounted:function(){
        this.img = this.randomIntFromInterval(1,7);
        this.parent = this.$parent.$parent;
    },

   methods: {
  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  login() {
    if(!this.parent || !this.parent.formData.email || !this.parent.formData.password){
        this.$refs.msg.alertFun("Заполните все поля!");
        return;
    }

    const data = this.parent.toFormData(this.parent.formData);

    axios.post(this.parent.url + "/site/login", data)
      .then((response) => {
        if(response.data.error){
          this.$refs.msg.alertFun(response.data.error);
        }

        if(response.data.user){
          this.parent.user = response.data.user;
          window.localStorage.setItem('user', JSON.stringify(this.parent.user));
          this.parent.page('/campaigns');  
        }
      })
      .catch((error) => {
        console.error('errors : ', error);
        this.$refs.msg.alertFun("Ошибка сервера");
      });
  }
},

    template:` 
        <div class="flex">
  <msg ref="msg" />

  <!-- LEFT AREA -->
  <div id="left-area" class="w40">
    <div class="header">
      <div class="wrapper flex">
        <div class="w40 logo">
          <img :src="parent.url + '/app/views/images/logo.svg'" />
        </div>

        <div class="w60 al">
          <h1>Affiliate Sign in</h1>
        </div>
      </div>
    </div>

    <div class="form inner-form p20">
      <form @submit.prevent="login()" v-if="parent.formData">

        <div class="row">
          <label>Email</label>
          <input 
            type="email"
            v-model="parent.formData.email"
            required
          />
        </div>

        <div class="row">
          <label>Password</label>
          <input 
            type="password"
            v-model="parent.formData.password"
            required
            autocomplete="on"
          />
        </div>

        <div class="row">
          <button class="btn">Sign in</button>
        </div>

      </form>
    </div>
  </div>

  <!-- RIGHT AREA -->
  <div id="right-area" class="w60">
    <img :src="parent.url + '/app/views/images/Cover_' + img + '.jpg'" />
  </div>
</div>
`
};
