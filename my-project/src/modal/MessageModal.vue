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

function closeModal() {
	emit('modalClose')
}

</script>

<style  src="@/style/modal.css"  scoped></style>
