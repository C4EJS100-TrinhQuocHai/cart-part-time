// function render product
// lấy danh sách sản phẩm trên local về
let products=JSON.parse(localStorage.getItem("products"))||[];
let users=JSON.parse(localStorage.getItem("users"))||[];
function renderProducts() {
    let text="";
    for (let i = 0; i < products.length; i++) {
      text+=
      `
                <div class="product__item">

                    <div class="product__item--image">
                        <img src="${products[i].image}" alt="">
                    </div>

                    <div class="product__item--infor">
                        <div class="product__item--name">
                            ${products[i].name}
                        </div>

                        <div class="product__item--price">
                         ${products[i].price}
                            <span onclick="addToCart(${products[i].id})" class="material-symbols-outlined choose-cart">
                                shopping_cart_checkout
                            </span>
                        </div>
                    </div>
                </div> 
      `
    }
    document.getElementsByClassName("products")[0].innerHTML=text;

}
renderProducts();
//function addtocart
// lấy checkLogin về
let checkLogin =localStorage.getItem("checkLogin");
function addToCart(idProduct) {
    console.log("11111",idProduct);
    if(checkLogin==null){
        console.log("bạn phải đăng nhập");
        return;
    }
    for (let i = 0; i < users.length; i++) {
       if(users[i].id==checkLogin){
           // users[i].cart đây chính là giỏ hàng của user đăng nhập
           for (let j = 0; j < products.length; j++) {
                // kiểm tra xem cái  thằng mua là thằng nào khi đã biết id sản phẩm
                if(products[j].id==idProduct){
                    // trước khhi push phải kiểm tra xem thằng đó đã có trong giỏ hàng hay chưa
                    let result = users[i].cart.filter((item)=>{
                        return item.id ==idProduct;
                    })
                    if(result.length==0){
                        users[i].cart.push(products[j]);
                        localStorage.setItem("users", JSON.stringify(users));
                        return;
                    }
                    result[0].quantity=++result[0].quantity;
                    localStorage.setItem("users", JSON.stringify(users));
                    
                }
            
           }
       }
        
    }
    // lấy giỏ hàng của người dùng vừa đăng nhập để đi mua hàng
}