<template>
	<div class="wrapper">

		<!-- header部分 -->
		<header>
			<p>我的订单</p>
		</header>

		<!-- 订单列表部分 -->
		<h3>未支付订单信息：</h3>
		<ul class="order">
			<li v-for="order in orderArr">
        <div v-if="order && order.orderState === 0">
				<div class="order-info">
					<p>
						{{order.business.businessName}}
						<i class="fa fa-caret-down" @click="detailetShow(order)"></i>
					</p>
					<div class="order-info-right">
						<p>&#165;{{order.orderTotal}}</p>
						<div class="order-info-right-icon">去支付</div>
					</div>
				</div>
				<ul class="order-detailet" v-show="order.isShowDetailet">
					<li v-for="odorder in order.list">
						<p>{{odorder.food.foodName}} x {{odorder.quantity}}</p>
						<p>&#165;{{odorder.food.foodPrice*odorder.quantity}}</p>
					</li>
					<li>
						<p>配送费</p>
						<p>&#165;{{order.business.deliveryPrice}}</p>
					</li>
				</ul>
        </div>
			</li>
		</ul>

		<h3>已支付订单信息：</h3>
		<ul class="order">
      <li v-for="order in orderArr" >
        <div v-if="order && order.orderState === 1">
				<div class="order-info">
					<p>
						{{order.business.businessName}}
						<i class="fa fa-caret-down" @click="detailetShow(order)"></i>
					</p>
					<div class="order-info-right">
						<p>&#165;{{order.orderTotal}}</p>
					</div>
				</div>
				<ul class="order-detailet" v-show="order.isShowDetailet">
					<li v-for="odorder in order.list">
						<p>{{odorder.food.foodName}} x {{odorder.quantity}}</p>
						<p>&#165;{{odorder.food.foodPrice*odorder.quantity}}</p>
					</li>
					<li>
						<p>配送费</p>
						<p>&#165;{{order.business.deliveryPrice}}</p>
					</li>
				</ul>
        </div>
			</li>
		</ul>

		<!-- 底部菜单部分 -->
		<Footer></Footer>

	</div>
</template>

<script setup>
import {ref, onMounted, reactive} from 'vue';
import axios from 'axios';
import qs from 'qs';
import Footer from '../components/Footer.vue';

const orderArr = ref([])
const user = ref({});

const detailetShow = (orders) => {
  orders.isShowDetailet = !orders.isShowDetailet;
};

onMounted( () => {
  user.value = JSON.parse(localStorage.getItem('user'));

  axios.post('OrdersController/listOrdersByUserId', qs.stringify({
    userId: user.value.userId
  })).then(response => {
    let result = response.data;
    for (let orders of result) {
      orders.isShowDetailet = false;
    }
    orderArr.value = result;
  }).catch(error => {
    console.error(error);
  });
});
</script>


<style scoped>
	/****************** 总容器 ******************/
	.wrapper {
		width: 100%;
		height: 100%;
	}

	/****************** header部分 ******************/
	.wrapper header {
		width: 100%;
		height: 12vw;
		background-color: #0097FF;
		color: #fff;
		font-size: 4.8vw;

		position: fixed;
		left: 0;
		top: 0;
		z-index: 1000;

		display: flex;
		justify-content: center;
		align-orders: center;
	}

	/****************** 历史订单列表部分 ******************/
	.wrapper h3 {
		margin-top: 12vw;
		box-sizing: border-box;
		padding: 4vw;
		font-size: 4vw;
		font-weight: 300;
		color: #999;
	}

	.wrapper .order {
		width: 100%;
	}

	.wrapper .order li {
		width: 100%;
	}

	.wrapper .order li .order-info {
		box-sizing: border-box;
		padding: 2vw 4vw;
		font-size: 4vw;
		color: #666;

		display: flex;
		justify-content: space-between;
		align-orders: center;
	}

	.wrapper .order li .order-info .order-info-right {
		display: flex;
	}

	.wrapper .order li .order-info .order-info-right .order-info-right-icon {
		background-color: #f90;
		color: #fff;
		border-radius: 3px;
		margin-left: 2vw;
		user-select: none;
		cursor: pointer;
	}

	.wrapper .order li .order-detailet {
		width: 100%;
	}

	.wrapper .order li .order-detailet li {
		width: 100%;
		box-sizing: border-box;
		padding: 1vw 4vw;
		color: #666;
		font-size: 3vw;

		display: flex;
		justify-content: space-between;
		align-orders: center;
	}
</style>
