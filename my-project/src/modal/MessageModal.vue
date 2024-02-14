<template>
	<div>
		<div class="modal-content">
			<button class="modal-mask" @click="closeModal"></button>
			<div class="container" style="width: 450px;	">
				<div class="card px-5 py-5 " style="	justify-content: start;	align-items: start ;" id="form1">
					<b> {{ props.messageData }} </b>
					<div
						style="font-size: 2rem;font-weight: 400;	width: 100%; display: flex;  align-items: end ; margin-top: 20px;">
						<button class="modal-dialog-button" style="margin-left: auto;" @click="closeModal">확인</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
	messageData: {},
	messageSub: {}
})

const emit = defineEmits(['modalClose'])

const closeModal = () => {
	emit('modalClose')
}

</script>

<style scoped>
.container {
	z-index: 999;
	background-color: #fff;
	border-radius: 16px;

	box-shadow: 0 20px 60px -2px rgb(27 33 58 / 40%);
}

.modal-mask {
	position: fixed;
	z-index: 998;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.2);
	display: table;
	transition: opacity 0.3s ease;
}

.modal-content {
	position: fixed;
	z-index: 900;
	top: 0%;
	left: 0%;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}
</style>
