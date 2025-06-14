<template>
  <div class="row">
    <!-- <div><h1>追蹤看板</h1></div> -->
    <div class="col-sm-12">
        <iq-card>
          <div class="card-body profile-page p-0">
              <!-- <div class="profile-header profile-info">
                <div class="cover-container">
                    <img src="../../../assets/images/page-img/profile-bg1.jpg" alt="profile-bg" class="rounded img-fluid">
                    <ul class="header-nav list-inline d-flex flex-wrap justify-end p-0 m-0">
                        <li><a href="#" class="material-symbols-outlined">
                           edit
                           </a>
                        </li>
                        <li><a href="#" class="material-symbols-outlined">
                           settings
                           </a>
                        </li>
                     </ul>
                </div>
                <div class="user-detail text-center mb-3">
                    <div class="profile-img">
                      <img src="../../../assets/images/user/11.png" alt="profile-img" class="avatar-130 img-fluid" />
                    </div>
                    <div class="profile-detail">
                      <h3 class="">Paul Molive</h3>
                    </div>
                </div>
                <div class="profile-info p-4 d-flex align-items-center justify-content-between position-relative">
                    <div class="social-links">
                      <ul class="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                          <li  v-for="(item,index) in social" :key="index" class="text-center pe-3">
                            <a href="javasctipt:void(0)"><img :src="item" class="img-fluid rounded" alt="facebook"></a>
                          </li>
                      </ul>
                    </div>
                    <div class="social-info">
                      <ul class="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                          <li v-for="(i,index) in soicalInfo" :key="index" class="text-center ps-3">
                            <h6>{{i.name}}</h6>
                            <p class="mb-0">{{i.value}}</p>
                          </li>
                      </ul>
                    </div>
                </div>
              </div> -->
          </div>
        </iq-card>
    </div>
    <!-- <div class="col-lg-4 col-md-6 mt-5">
      <iq-card className="card-block card-stretch card-height">
        <div class="card-body">
          <div class="badges text-start">
            <div class="badges-icon">
              <img class="avatar-80 rounded" src="../../../assets/images/badges/01.png" alt="">
            </div>
            <h3 class="mb-2 title">財經</h3>
            <p>Richard McClintock, a Latin professor consectetur.</p>
            <span class="text-uppercase">Unlock Jan 15th, 2020</span>
          </div>
        </div>
      </iq-card>
    </div> -->

     <!-- <div class="col-lg-4 col-md-6 mt-5" v-for="(profile,index) in profiles" :key="index">
        <iq-card className="card-block card-stretch card-height">
          <template v-slot:body>
              <div class="badges text-start">
                <div class="badges-icon">
                    <img class="avatar-80 rounded" :src="profile.src" alt="">
                </div>
                <h5 class="mb-2 title">{{profile.name}}</h5>
                <p>{{profile.desc}}</p>
                <span class="text-uppercase">{{profile.date}}</span>
              </div>
          </template>
        </iq-card>
     </div> -->
     <div class="col-lg-4 col-md-6 mt-5" v-for="(profile, index) in profiles" :key="index">
      <iq-card class="card-block card-stretch card-height">
        <div class="card-body">
          <div class="badges text-start">
            <div class="badges-icon">
              <img class="avatar-80 rounded" :src="profile.src" alt="">
            </div>
            <h3 class="mb-2 title">
              <a :href="`/${profile.path}`">{{ profile.name }}</a>
            </h3>
            <button 
              type="button" 
              class="btn btn-outline-primary mb-3 me-1"
              @click="toggleFollow(index)"
            >
              {{ profile.following ? '追蹤中' : '追蹤' }}
            </button>
            <p>{{ profile.desc }}</p>
            <a :href="`/${profile.path}`" class="link-style">瀏覽看板</a>
          </div>
        </div>
      </iq-card>
    </div>
  </div>
</template>
<script>

// import { socialvue } from '../../../config/pluginInit'
export default {
  name: 'FollowingProfileBadges',
  mounted () {
    // socialvue.index()
    this.fetchProfiles();
  },
  components: {
  },
  data () {
    return {
      profiles: [
        {
          src: require('../../../assets/images/badges/01.png'),
          name: '財經',
          desc: '實時市場更新，全球金融資訊，專業分析，用戶友好介面，投資者必備工具。',
          path: 'financepage',
          following: true
        },
        {
        src: require('../../../assets/images/badges/02.png'),
        name: '體育',
        desc: '全面賽事覆蓋，實時比分更新，深度分析評論，精彩賽事重播，體育迷互動平台。',
        path: 'sportspage',
          following: true
        },
        {
          src: require('../../../assets/images/badges/03.png'),
          name: '新聞',
          desc: '即時新聞報導，全球事件追蹤，深度分析與專欄，多媒體內容整合，用戶參與與評論。',
          date: 'Unlock Jan 15th, 2020',
          following: true
        },
        {
          src: require('../../../assets/images/badges/04.png'),
          name: '影視',
          desc: 'Richard McClintock, a Latin professor consectetur.',
          date: 'Unlock Jan 15th, 2020',
          following: true
        },
        {
          src: require('../../../assets/images/badges/05.png'),
          name: '自然',
          desc: 'Richard McClintock, a Latin professor consectetur.',
          date: 'Unlock Jan 15th, 2020',
          following: true
        },
        {
          src: require('../../../assets/images/badges/06.png'),
          name: '科技',
          desc: 'Richard McClintock, a Latin professor consectetur.',
          date: 'Unlock Jan 15th, 2020',
          following: true
        }
      ]
    }
  },
  methods: {
    toggleFollow(index) {
      this.profiles[index].following = !this.profiles[index].following;
      // Optionally send this information back to the server...
    },

    fetchProfiles() {
      // Placeholder for fetching data from an API
      // e.g., this.profiles = fetchDataFromApi();
    }
  }
  // methods: {
  //   toggleFollow(index) {
  //     if (this.profiles[index].following) {
  //       // If following, toggle to unfollow and remove from list
  //       this.profiles.splice(index, 1);  // This removes the profile from the array
  //     } else {
  //       // Code to follow the profile if needed, typically won't be reached since the button disappears
  //       this.profiles[index].following = true;
  //     }
  //   },
  //   fetchProfiles() {
  //     // API call to fetch profiles if needed
  //   }
  // }
}
</script>
