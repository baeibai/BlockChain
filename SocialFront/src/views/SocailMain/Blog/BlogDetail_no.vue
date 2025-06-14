<template>
   <div class="col-sm-12">
     <div class="card card-block card-stretch card-height">
       <div class="card-body">
         <div class="user-post-data">
           <div class="d-flex justify-content-between">
             <div class="me-3">
               <img class="rounded-circle img-fluid" src="@/assets/images/user/01.jpg" alt="">
             </div>
             <div class="w-100">
               <div class="d-flex justify-content-between">
                 <div class="">
                   <h5 class="mb-0 d-inline-block">張書豪</h5>
                   <p class="mb-0 text-primary">5小時前</p>
                 </div>
                 <div class="d-flex">                   
                  

                 </div>

               </div>
             </div>
           </div>
         </div>
         <div class="mt-3">
           <p>在那片遼闠的青綠草原上，一匹孤獨的馬自由奔跑著，伴隨著風的低鳴和草的搖曳。它的蹄聲仿佛敲打著自然的鼓點，釋放著野性的呼喚。遠方，夕陽如血，將天空染成紅色，一片壯麗。每當風吹過，馬鬃如波浪般翻滾，那是自由的象徵，是對未知世界無盡的渴望。這匹馬不只是在草原上旅行，它還在追尋著自己的夢想。</p>
         </div>
         <div class="user-post">
           <div class="d-grid grid-rows-2 grid-flow-col gap-3">
             <div class="row-span-1">
               <img src="@/assets/images/page-img/p3.jpg" alt="post-image" class="img-fluid rounded w-100">
             </div>
             <div class="row-span-1">
               <img src="@/assets/images/page-img/p3.jpg" alt="post-image" class="img-fluid rounded w-100">
             </div>
             <div class="row-span-1">
               <img src="@/assets/images/page-img/p3.jpg" alt="post-image" class="img-fluid rounded w-100">
             </div>
           </div>
         </div>
         <div class="comment-area mt-3">
           <div class="d-flex justify-content-between align-items-center flex-wrap">
             <div class="like-block position-relative d-flex align-items-center">
               <div class="d-flex align-items-center">
                 <div class="total-like-block ms-2 me-3">
                   <div class="d-flex align-items-center">
                     <button class="btn btn-success me-2 btn-primary" @click="incrementSupport">支持</button>
                     <span class="me-3">{{ supportCount }}</span>
                     <button class="btn btn-danger me-2 btn-light" @click="decrementSupport">反對</button>
                     <span class="me-3">{{ opposeCount }}</span>
                     <!-- <label for="fileProgress" class="me-2">支持進度：</label>
                     <progress id="fileProgress" max="100" :value="supportPercentage" v-text="supportPercentage + '%'"></progress> -->
                     <i class="material-symbols-outlined pe-2 md-18 text-primary">
                        mode_comment
                        </i>
                     <span class="me-3">{{ commentCount}}則留言</span>
                  </div>
                 </div>
               </div>
             </div>
             <div class="ms-auto d-flex align-items-center">
               <i class="material-symbols-outlined pe-2 md-18 text-primary">
                  bookmark
               </i>
               </div>
           </div>
           <hr>
           <ul class="post-comments list-inline p-0 m-0">
             <li class="mb-2">
               <div class="d-flex">
                 <div class="user-img">
                   <img src="@/assets/images/user/02.jpg" alt="userimg" class="avatar-35 rounded-circle img-fluid">
                 </div>
                 <div class="comment-data-block ms-3">
                   <h6>陳建宇</h6>
                   <p class="mb-0">那匹馬象徵著無拘無束的靈魂，追求自由與未知的冒險。</p>
                 </div>
               </div>
             </li>
             <li>
               <div class="d-flex">
                 <div class="user-img">
                   <img src="@/assets/images/user/03.jpg" alt="userimg" class="avatar-35 rounded-circle img-fluid">
                 </div>
                 <div class="comment-data-block ms-3">
                   <h6>李思瑤</h6>
                   <p class="mb-0">馬的奔跑，心之所向，自由呼吸。</p>
                 </div>
               </div>
             </li>
           </ul>
           <form class="comment-text d-flex align-items-center mt-3" action="javascript:void(0);">
             <input type="text" class="form-control rounded" placeholder="留言">
             <div class="comment-attagement d-flex">
               <button type="button" class="btn btn-primary mb-0 me-0">發送</button>
             </div>
           </form>
         </div>
       </div>
     </div>
   </div>
 </template>
 
 <script>
 import Swal from 'sweetalert2'
 import fireGif from '@/assets/images/user/fire.gif'
 import wateringGif from '@/assets/images/user/watering.gif'
 
 export default {
   name: 'VerifiedArticle',
   data() {
     return {
       supportCount: 23,
       opposeCount: 33,
       commentCount:20,
       fireGif,
       wateringGif,
       maimage:[
         { maimage: require('@/assets/images/page-img/p1.jpg') },
         { maimage: require('@/assets/images/page-img/p1.jpg') }
      ]
     };
   },
   computed: {
     supportPercentage() {
       let total = this.supportCount + this.opposeCount;
       return total === 0 ? 0 : Math.round((this.supportCount / total) * 100);
     }
   },
   methods: {
     incrementSupport() {
       this.supportCount += 1;
       this.showGifAnimation(this.fireGif,'支持');
     },
     decrementSupport() {
       this.opposeCount += 1;
       this.showGifAnimation(this.wateringGif,'反對');
     },

     showGifAnimation(gifUrl, message) {
       Swal.fire({
         title: message,
         imageUrl: gifUrl,
         imageHeight: 200,
         imageAlt: 'GIF Animation',
         showConfirmButton: false,
         timer: 1500, 
         width: '350px',
         height: '350px',
        // background: 'transparent',
        // backdrop: 'rgba(0,0,0,0)'
       });
     }
     }
   }
 
 </script>