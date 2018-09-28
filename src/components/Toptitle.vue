<template>
  <div>
    <div v-if="list==undefined">    
      <p class="Title">{{Title}}</p>
  </div>
  <div v-else>
      <p class="Title">{{Title}}
          <span >></span>
          <span>{{list}}</span>
          </p>
  </div>
  </div>
</template>
<script>
export default {
  props: {
    Title: String,
    list: String
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style>
.Title span {
  margin-left: 4px;
}

.Title {
  height: 40px;
  line-height: 40px;
  /* color: #000; */
  background: #f7f7f7;
  text-indent: 16px;
  font-size: 16px;
  border-bottom: 1px solid #52c0c7;
  margin-bottom: 8px;
}
</style>
