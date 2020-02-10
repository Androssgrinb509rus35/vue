

new Vue({
  el: "#app",
  data: {
    tbody: [
      {"login": "smith@gmail.com", "number": 312, "status": "Ценитель красоты"},
      {"login": "lenin@gmail.com", "number": 120, "status": "Поставщик аксессуаров"},
      {"login": "mask@gmail.com", "number": 98, "status": "Конкурент минздрава"},
      {"login": "dog@mail.ru", "number": 64, "status": "рыбак"},
      {"login": "nightmare@mail.ru", "number": 34, "status": "охотник"},
      {"login": "cat@mail.ru", "number": 1, "status": "Ценитель красоты"}

    ],
    login: "",
    minNumber: 0,
    maxNumber: 10000,
    status: ""
  },
  methods: {
    isLogin: function(value){


      return value.replace(/\@.+/gs, '').toLowerCase().search(new RegExp("^"+this.login.toLowerCase(),'g')) !== -1;
    },
    isNumber: function(n){
      return this.minNumber < n && this.maxNumber > n;
    },
    isStatus: function(st){
        return st.toLowerCase().search(new RegExp("^"+this.status.toLowerCase(),'g')) !== -1 || st.toLowerCase().search(new RegExp(" "+this.status.toLowerCase(),'g')) !== -1;
    },
    sortNumber: function(){
      this.tbody =  this.sort(this.tbody, "number");
      this.setUrl("sort", "sortNumber");
    },
    deskSortNumber: function(){
        this.tbody =  this.sort(this.tbody, "number", true);
        this.setUrl("sort", "deskSortNumber");
    },
    sortLogin: function(){
      this.tbody =  this.sort(this.tbody, "login");
        this.setUrl("sort", "sortLogin");
    },
    deskSortLogin: function(){
        this.tbody =  this.sort(this.tbody, "login", true);
            this.setUrl("sort","deskSortLogin");
    },
    sortStatus: function(){
        this.tbody =  this.sort(this.tbody, "status");
          this.setUrl("sort", "sortStatus");
    },
    deskSortStatus: function(){
        this.tbody =  this.sort(this.tbody, "status", true);
            this.setUrl("sort", "deskSortStatus");
    },
    sort: function(sr, key, desc = false){
      return  sr.sort(function (a, b) {
          if(String(parseInt(a[key])) === 'NaN'){
              a[key] = a[key].toLowerCase();
          }

          if(String(parseInt(b[key])) === 'NaN'){
              b[key] = b[key].toLowerCase();
          }
          if(desc === false){
               if (a[key] > b[key]) {
                 return 1;
               }
               if (a[key] < b[key]) {
                 return -1;
               }
            }else{
              if (a[key] > b[key]) {
                return -1;
              }
              if (a[key] < b[key]) {
                return 1;
              }
            }
             // a должно быть равным b
             return 0;
       });
    },
    setUrl: function(key, value = null){

      var url = new URL(window.location.href);
      var flag  = false;
      if(value === null){
        if(this[key].trim() !== ""){
          url.searchParams.set(key, this[key]);
        }else{
            url.searchParams.delete(key);
            flag = true;
        }
      }else{
          url.searchParams.set(key, value);
      }

  var href = flag === true ? url.href: url.search;
        history.pushState(null, null,href );
    }

  },
  watch: {
   login: function(val){
     this.setUrl("login");
   },
   status:function(val){
     this.setUrl("status");
   },
   minNumber:function(val){
     this.setUrl("minNumber");

   },
   maxNumber:function(val){

     this.setUrl("maxNumber");
   }
 },
 created: function(){
     var url = new URL(window.location.href);
     if(url.searchParams.get('login') !== null && url.searchParams.get('login').trim() !== ""){
       this.login = url.searchParams.get('login');
     }

     if(url.searchParams.get('status') !== null && url.searchParams.get('status').trim() !== ""){
       this.status = url.searchParams.get('status');
     }

     if(url.searchParams.get('minNumber') !== null && url.searchParams.get('minNumber').trim() !== ""){
       this.minNumber = url.searchParams.get('minNumber');
     }

     if(url.searchParams.get('maxNumber') !== null && url.searchParams.get('maxNumber').trim() !== ""){
       this.maxNumber = url.searchParams.get('maxNumber');
     }

     if(url.searchParams.get('sort') !== null && url.searchParams.get('sort').trim() !== ""){

        this[url.searchParams.get('sort')]();
     }

 }
});
