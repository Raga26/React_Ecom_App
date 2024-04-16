import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import Order from "./Order";

//getPreviousorders
let getPreviousOrders = (orders) =>{
  //console.log("order error" ,orders);
  return orders.filter((ord) => ord.isPaymentCompleted === true);
}

//getCart
let getCart = (orders) =>{
  return orders.filter(ord => ord.isPaymentCompleted === false);
}

function Dashboard(){
  let[orders , setOrder]= useState([]);

   //get context
   let userContext = useContext(UserContext);

  //executes only once - on initial reminder = componentDidMount
  useEffect(() => {
    document.title = "Dashboard - eCommerce";

    console.log(" problem order : " , userContext.user.currentUserId);
     //load data from database
     (async () => {
      let ordersResponse = await fetch(
        `http://localhost:5000/orders?userId=${userContext.user.currentUserId}`,
        { method: "GET" }
      );

      if (ordersResponse.ok) {
        //status code is 200
        let ordersResponseBody = await ordersResponse.json();

        //get all data from products
        let productsResponse = await fetch("http://localhost:5000/products", {
          method: "GET",
        });
        if (productsResponse.ok) {
          let productsResponseBody = await productsResponse.json();

          //console.log(" to check 1 : order : " , ordersResponseBody);
          console.log(" to check 2 : prd : " , productsResponseBody);

          //read all orders data
          ordersResponseBody.forEach((order) => {
            order.product = productsResponseBody.find(
              (prod) => prod.id == order.productId
              
            );
          });

          // let prds1;
          // for(const order of ordersResponseBody){
          //   for (const prod of productsResponseBody) {
          //       if (prod.id === order.productId) {
          //         console.log("inside testing loop : " ,  prod);
          //          prds1 = prod;
          //       }
          //   }
          // }
          // console.log("outside testing loop : " ,  prds1);

          console.log("ordersResponseBody before set state : " , ordersResponseBody);

          setOrder(ordersResponseBody);
        }
      }
    })();
  }, [userContext.user.currentUserId]);

 
  return (
    
    <div className="row">
      <div className="col-12 py-3 header">
        <h4 className>
          <i className="fa fa-dashboard">Dashboard</i>
        </h4>
      </div>
    
    
    <div className="col-12">
      <div className="row">
      {/* previous orders starts */}
      <div className="col-lg-6">
        <h4 className="py-2 my-2 text-info border-bottom border-info"> <i className="fa fa-history"></i> 
        Previous Orders{" "}
         <span className="badge badge-info">
         {getPreviousOrders(orders).length}
         </span>
        </h4>

        {getPreviousOrders(orders).length == 0?
        (<div className="text-danger">No Orders</div>)
        : ("") }

        {getPreviousOrders(orders).map((ord) => {
              return (
                <Order
                  key={ord.id}
                  orderId={ord.id}
                  productId={ord.productId}
                  userId={ord.userId}
                  isPaymentCompleted={ord.isPaymentCompleted}
                  quantity={ord.quantity}
                  productName={ord.product.productName}
                  price={ord.product.price}
                />
              );
            })}

      </div>

      {/* cart starts*/}
      <div className="col-lg-6">
            <h4 className="py-2 my-2 text-primary border-bottom border-primary">
              <i className="fa fa-shopping-cart"></i> Cart{" "}
              <span className="badge badge-primary">
                {getCart(orders).length}
              </span>
            </h4>

            {getCart(orders).length === 0 ? (
              <div className="text-danger">No products in your cart</div>
            ) : (
              ""
            )}

            {getCart(orders).map((ord) => {
              return (
                <Order
                  key={ord.id}
                  orderId={ord.id}
                  productId={ord.productId}
                  userId={ord.userId}
                  isPaymentCompleted={ord.isPaymentCompleted}
                  quantity={ord.quantity}
                  productName={ord.product.productName}
                  price={ord.product.price}
                />
              );
            })}
          </div>

    </div>
    </div>

    </div>

  );

}

export default Dashboard;
