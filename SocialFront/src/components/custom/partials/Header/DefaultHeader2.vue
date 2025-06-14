
<template>
<div class="iq-top-navbar">
    <nav class="nav navbar navbar-expand-lg navbar-light iq-navbar p-lg-0">
        <div class="container-fluid navbar-inner">
            <div class="d-flex align-items-center gap-3">
                <router-link :to="{ name: 'social.list'}" class="d-flex align-items-center gap-2 iq-header-logo d-none d-lg-flex iq-logo-none">
                    <svg width="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.67733 9.50001L7.88976 20.2602C9.81426 23.5936 14.6255 23.5936 16.55 20.2602L22.7624 9.5C24.6869 6.16666 22.2813 2 18.4323 2H6.00746C2.15845 2 -0.247164 6.16668 1.67733 9.50001ZM14.818 19.2602C13.6633 21.2602 10.7765 21.2602 9.62181 19.2602L9.46165 18.9828L9.46597 18.7275C9.48329 17.7026 9.76288 16.6993 10.2781 15.8131L12.0767 12.7195L14.1092 16.2155C14.4957 16.8803 14.7508 17.6132 14.8607 18.3743L14.9544 19.0239L14.818 19.2602ZM16.4299 16.4683L19.3673 11.3806C18.7773 11.5172 18.172 11.5868 17.5629 11.5868H13.7316L15.8382 15.2102C16.0721 15.6125 16.2699 16.0335 16.4299 16.4683ZM20.9542 8.63193L21.0304 8.5C22.1851 6.5 20.7417 4 18.4323 4H17.8353L17.1846 4.56727C16.6902 4.99824 16.2698 5.50736 15.9402 6.07437L13.8981 9.58676H17.5629C18.4271 9.58676 19.281 9.40011 20.0663 9.03957L20.9542 8.63193ZM14.9554 4C14.6791 4.33499 14.4301 4.69248 14.2111 5.06912L12.0767 8.74038L10.0324 5.22419C9.77912 4.78855 9.48582 4.37881 9.15689 4H14.9554ZM6.15405 4H6.00746C3.69806 4 2.25468 6.50001 3.40938 8.50001L3.4915 8.64223L4.37838 9.04644C5.15962 9.40251 6.00817 9.58676 6.86672 9.58676H10.2553L8.30338 6.22943C7.9234 5.57587 7.42333 5.00001 6.8295 4.53215L6.15405 4ZM5.07407 11.3833L7.88909 16.2591C8.05955 15.7565 8.28025 15.2702 8.54905 14.8079L10.4218 11.5868H6.86672C6.26169 11.5868 5.66037 11.5181 5.07407 11.3833Z" fill="currentColor"/>
                    </svg>
                </router-link>
            </div>
            <div class="d-block d-lg-none">
                <router-link :to="{ name: 'social.list'}" class="d-flex align-items-center gap-2 iq-header-logo">
                <svg width="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.67733 9.50001L7.88976 20.2602C9.81426 23.5936 14.6255 23.5936 16.55 20.2602L22.7624 9.5C24.6869 6.16666 22.2813 2 18.4323 2H6.00746C2.15845 2 -0.247164 6.16668 1.67733 9.50001ZM14.818 19.2602C13.6633 21.2602 10.7765 21.2602 9.62181 19.2602L9.46165 18.9828L9.46597 18.7275C9.48329 17.7026 9.76288 16.6993 10.2781 15.8131L12.0767 12.7195L14.1092 16.2155C14.4957 16.8803 14.7508 17.6132 14.8607 18.3743L14.9544 19.0239L14.818 19.2602ZM16.4299 16.4683L19.3673 11.3806C18.7773 11.5172 18.172 11.5868 17.5629 11.5868H13.7316L15.8382 15.2102C16.0721 15.6125 16.2699 16.0335 16.4299 16.4683ZM20.9542 8.63193L21.0304 8.5C22.1851 6.5 20.7417 4 18.4323 4H17.8353L17.1846 4.56727C16.6902 4.99824 16.2698 5.50736 15.9402 6.07437L13.8981 9.58676H17.5629C18.4271 9.58676 19.281 9.40011 20.0663 9.03957L20.9542 8.63193ZM14.9554 4C14.6791 4.33499 14.4301 4.69248 14.2111 5.06912L12.0767 8.74038L10.0324 5.22419C9.77912 4.78855 9.48582 4.37881 9.15689 4H14.9554ZM6.15405 4H6.00746C3.69806 4 2.25468 6.50001 3.40938 8.50001L3.4915 8.64223L4.37838 9.04644C5.15962 9.40251 6.00817 9.58676 6.86672 9.58676H10.2553L8.30338 6.22943C7.9234 5.57587 7.42333 5.00001 6.8295 4.53215L6.15405 4ZM5.07407 11.3833L7.88909 16.2591C8.05955 15.7565 8.28025 15.2702 8.54905 14.8079L10.4218 11.5868H6.86672C6.26169 11.5868 5.66037 11.5181 5.07407 11.3833Z" fill="currentColor"/>
                </svg>
                </router-link>
            </div>

            <div class="iq-search-bar device-search  position-relative">
            <form action="#" class="searchbox" data-bs-toggle="modal" data-bs-target="#exampleModalFullscreenSm">
               <a class="search-link d-none d-lg-block" href="javascript:void(0);" >
                  <span class="material-symbols-outlined">search</span>
               </a>
               <input type="text" class="text search-input form-control bg-soft-primary  d-none d-lg-block" placeholder="Search here...">
                <a class="d-lg-none d-flex" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#exampleModalFullscreenSm">
                  <span class="material-symbols-outlined">search</span>
               </a>
            </form>
            <!--  modal full screen modal -->
            <div class="modal fade search-modal" id="exampleModalFullscreenSm" aria-labelledby="exampleModalFullscreenSmLabel" aria-hidden="true" >
               <div class="modal-dialog modal-fullscreen-lg-down">
                  <div class="modal-content">
                     <div class="modal-header py-2">
                        <div class="d-flex align-items-center justify-content-between d-lg-none w-100">
                           <form action="#" class="searchbox w-50" data-bs-toggle="modal" data-bs-target="#exampleModalFullscreenSm">
                              <a class="search-link" href="javascript:void(0);" >
                                 <span class="material-symbols-outlined">search</span>
                              </a>
                              <input type="text" class="text search-input form-control bg-soft-primary" placeholder="Search here...">
                           </form>
                           <a href="javascript:void(0);" class="material-symbols-outlined text-dark" data-bs-dismiss="modal">close</a>
                        </div>
                        <div class="d-none d-lg-flex align-items-center justify-content-between w-100">
                           <h4 class="modal-title" id="exampleModalFullscreenLabel">Recent</h4>
                           <a  class="text-dark" href="javascript:void(0);">Clear All</a>
                        </div>
                     </div>
                     <div class="modal-body p-0">
                        <div class="d-flex d-lg-none align-items-center justify-content-between w-100 p-3 pb-0">
                           <h5 class="modal-title h4" id="exampleModalFullscreenLabel">Recent</h5>
                           <a href="javascript:void(0);" class="text-dark">Clear All</a>
                        </div>
                        <div class="d-flex align-items-center border-bottom search-hover py-2 px-3">
                              <div class="flex-shrink-0">
                                 <img src="../../../../assets/images/page-img/19.jpg" class="align-self-center img-fluid avatar-50 rounded-pill" alt="#">
                              </div>
                              <div class="d-flex flex-column ms-3">
                                 <a href="javascript:void(0);" class="h5">Paige Turner</a>
                                 <span>Paige001</span>
                              </div>
                              <div class="d-flex align-items-center ms-auto">
                                 <a href="javascript:void(0);" class="me-3 d-flex align-items-center"><small>Follow</small> </a>
                                 <a href="javascript:void(0);" class="material-symbols-outlined text-dark">close</a>
                              </div>
                        </div>
                        <div class="d-flex align-items-center border-bottom search-hover py-2 px-3">
                           <div class="flex-shrink-0">
                              <img src="../../../../assets/images/page-img/18.jpg" class="align-self-center img-fluid avatar-50 rounded-pill" alt="#">
                           </div>
                           <div class="d-flex flex-column ms-3">
                              <a href="javascript:void(0);" class="h5">Monty Carlo</a>
                              <span>Carlo.m</span>
                           </div>
                           <div class="d-flex align-items-center ms-auto">
                              <a href="javascript:void(0);" class="me-3 d-flex align-items-center"><small>Unfollow</small> </a>
                              <a href="javascript:void(0);" class="material-symbols-outlined text-dark">close</a>
                           </div>
                        </div>
                        <div class="d-flex align-items-center search-hover py-2 px-3 border-bottom">
                           <div class="flex-shrink-0">
                              <img src="../../../../assets/images/page-img/20.jpg" class="align-self-center img-fluid avatar-50 rounded-pill" alt="#">
                           </div>
                           <div class="d-flex flex-column ms-3">
                              <a href="javascript:void(0);" class="h5">Paul Molive</a>
                              <span>Paul.45</span>
                           </div>
                           <div class="d-flex align-items-center ms-auto">
                              <a href="javascript:void(0);" class="me-3 d-flex align-items-center"><small>Request</small> </a>
                              <a href="javascript:void(0);" class="material-symbols-outlined text-dark">close</a>
                           </div>
                        </div>
                        <div class="">
                           <h4 class="px-3 py-0">Suggestions</h4>
                           <div class="suggestion-card px-3 d-flex">
                              <div class="text-center story">
                                 <div class="story-profile">
                                    <img src="../../../../assets/images/page-img/20.jpg" class="avatar-50 rounded-pill" alt="#">
                                    <a href="javascript:void(0);" class="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">Ammy Paul</a>
                                 </div>
                                 <a href="javascript:void(0);" class="d-lg-none align-items-center d-flex"><small>Follow</small> </a>
                              </div>
                              <div class="text-center story">
                                 <div class="story-profile">
                                    <img src="../../../../assets/images/page-img/21.jpg" class=" avatar-50 rounded-pill" alt="#">
                                     <a href="javascript:void(0);" class="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">Roger Carlo</a>
                                 </div>
                                 <a href="javascript:void(0);" class="d-lg-none align-items-center d-flex"><small>Unfollow</small> </a>
                              </div>
                              <div class="text-center story ">
                                 <div class="story-profile">
                                    <img src="../../../../assets/images/page-img/22.jpg" class=" avatar-50 rounded-pill" alt="#">
                                    <a href="javascript:void(0);" class="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">Justin Molive</a>
                                 </div>
                               <a href="javascript:void(0);" class="d-lg-none align-items-center d-flex"><small>Follow</small> </a>
                              </div>
                              <div class="text-center story">
                                 <div class="story-profile ">
                                    <img src="../../../../assets/images/page-img/23.jpg" class=" avatar-50 rounded-pill" alt="#">
                                    <a href="javascript:void(0);" class="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">Roy Fisher</a>
                                 </div>
                                 <a href="javascript:void(0);" class="d-lg-none align-items-center d-flex"><small>Request</small> </a>
                              </div>
                              <div class="text-center story">
                                 <div class="story-profile">
                                    <img src="../../../../assets/images/page-img/24.jpg" class=" avatar-50 rounded-pill" alt="#">
                                    <a href="javascript:void(0);" class="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">Johan Carlo</a>
                                 </div>
                                 <a href="javascript:void(0);" class="d-lg-none align-items-center d-flex"><small>Follow</small> </a>
                              </div>
                              <div class="text-center story">
                                 <div class="story-profile">
                                    <img src="../../../../assets/images/page-img/09.jpg" class=" avatar-50 rounded-pill" alt="#">
                                    <a href="javascript:void(0);" class="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">Medra Miles</a>
                                 </div>
                                 <a href="javascript:void(0);" class="d-lg-none align-items-center d-flex"><small>Unfollow</small> </a>
                              </div>
                              <div class="text-center story">
                                 <div class="story-profile">
                                    <img src="../../../../assets/images/page-img/03.jpg" class=" avatar-50 rounded-pill" alt="#">
                                    <a href="javascript:void(0);" class="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">Aohan Paul</a>
                                 </div>
                                 <a href="javascript:void(0);" class="d-lg-none align-items-center d-flex"><small>Request</small> </a>
                              </div>
                              <div class="text-center story">
                                 <div class="story-profile">
                                    <img src="../../../../assets/images/page-img/02.jpg" class=" avatar-50 rounded-pill" alt="#">
                                    <a href="javascript:void(0);" class="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">Rokni Joy</a>
                                 </div>
                                 <a href="javascript:void(0);" class="d-lg-none align-items-center d-flex"><small>Follow</small> </a>
                              </div>
                              <div class="text-center story">
                                 <div class="story-profile">
                                    <img src="../../../../assets/images/page-img/09.jpg" class=" avatar-50 rounded-pill" alt="#">
                                    <a href="javascript:void(0);" class="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">Sepid Ryan</a>
                                 </div>
                                 <a href="javascript:void(0);" class="d-lg-none align-items-center d-flex"><small>Unfollow</small> </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
           </div>

            <div class="offcanvas offcanvas-end iq-profile-menu-responsive" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                <h5 id="offcanvasRightLabel">General Setting</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body pt-0">
                <ul class="navbar-nav  ms-auto navbar-list">
                    
                    <li class="nav-item">
                        <a href="../ProfileBadges" sytle="height:75%" class="btn-primary ">登入/註冊</a>
                    </li>
                    <li class="nav-item d-lg-none">
                        <router-link :to="{name: 'social.profile1'}" class="dropdown-toggle d-flex align-items-center">
                            <span class="material-symbols-outlined">person</span>
                            <span class="mobile-text  ms-3">Profile</span>
                        </router-link>
                    </li>
                </ul>
                </div>
            </div>
        </div>
    </nav>
</div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'DefaultHeader',
  props: {
    image: {
      type: String,
      default: require('@/assets/images/logo.png')
    }
  },
  setup () {
    const store = useStore()
    const sidebarType = computed(() => store.getters['setting/sidebar_type'])
    const toggleSidebar = () => {
      // Code Here
      if (sidebarType.value.includes('sidebar-mini')) {
        store.dispatch(
          'setting/sidebar_type',
          sidebarType.value.filter((item) => item !== 'sidebar-mini')
        )
      } else {
        store.dispatch('setting/sidebar_type', [...sidebarType.value, 'sidebar-mini'])
      }
    }
    return {
      store,
      sidebarType,
      toggleSidebar
    }
  }
}
</script>
