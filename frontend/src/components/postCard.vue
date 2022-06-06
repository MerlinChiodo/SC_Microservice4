<template>
  <div class="card">
    <DataView :value="posts" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: left">
            <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sortieren" @change="onSortChange($event)"/>
          </div>
          <div class="col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div class="product-list-item">
            <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.title"/>
            <div class="product-list-detail">
              <div class="product-name">{{slotProps.data.title}}</div>
              <div class="product-description">{{slotProps.data.short_description}}</div>
              <i class="pi pi-tag product-category-icon"></i><span class="product-category">{{slotProps.data.service}}</span>
            </div>
            <div class="product-list-action">
              <Button icon="pi pi-shopping-cart" label="Details" :disabled="slotProps.data.long_description === ''"></Button>
              <!--<span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>-->
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 md:col-4">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <i class="pi pi-tag product-category-icon"></i>
                <span class="product-category">{{slotProps.data.service}}</span>
              </div>
              <!--<span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>-->
            </div>
            <div class="product-grid-item-content">
              <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.title"/>
              <div class="product-name">{{slotProps.data.title}}</div>
              <div class="product-description">{{slotProps.data.short_description}}</div>
            </div>
            <div class="product-grid-item-bottom">
              <span class="product-price">${{slotProps.data.price}}</span>
              <Button icon="pi pi-shopping-cart" :disabled="slotProps.data.long_description === ''"></Button>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
const backendurl = "http://localhost:3001/";
export default {

  data() {
    return {
      posts: null,
      layout: 'grid',
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        {label: 'Price High to Low', value: '!created_on'},
        {label: 'Price Low to High', value: 'created_on'},
      ]
    }
  },

  mounted: function(){
    this.getServicePosts();
  },
  methods: {
    onSortChange(event){
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      }
      else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },
    getServicePosts(){
      const options = {
        method: 'GET'
      };
      fetch(backendurl + "posts/getAllServicePosts", options)
          .then((response) => response.json())
          .then((data) => {
            this.posts = data
          })
          .catch(error => {console.log(error)});
    }
  }
}


/*<script>
const backendurl = "http://localhost:3001/";
import {getAllServicePosts} from '../controllers/postController'
export default {
  name: "postCard",
  data() {
    return {
      posts: [],
      layout: 'list'
    }
  },
  postService: null,

  mounted: function(){
    this.getServicePosts();

    //this.posts = getAllServicePosts()

  },
  methods: {
    getServicePosts(){
      const options = {
        method: 'GET'
      };
      fetch(backendurl + "posts/getAllServicePosts", options)
          .then((response) => response.json())
          .then((data) => {
            this.posts = data
          })
          .catch(error => {console.log(error)});
    }
    }

}*/
</script>

<style scoped>

</style>