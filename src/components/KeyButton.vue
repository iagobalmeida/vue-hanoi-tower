<template>

    <div class="col text-center" v-on:click="$emit('handleClick')">
        <div :class="`p-2 shadow card mb-3 d-block ${wrapperClass}`">
            <div class="d-flex justify-content-center align-items-center flex-row">
                <div :class="`bg-light px-2 py-1 rounded shadow me-2 fw-bold text-muted d-none d-md-block ${keyName == ' ' ? 'w-10' : ''}`">
                    {{keyName == ' ' ? '␣' : keyName}}  
                </div>  
                <div class="d-flex justify-content-start align-items-center flex-column">
                    <p class="mb-0">{{title}}</p>
                    <small class=" fw-light" v-if="subtitle">{{subtitle}}</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "KeyButton",
  props: {
    handler: Function,
    keyName: String,
    title: String,
    subtitle: { type:String, default: '' },
    wrapperClass: { type:String, default: ''}
  }
};
</script>