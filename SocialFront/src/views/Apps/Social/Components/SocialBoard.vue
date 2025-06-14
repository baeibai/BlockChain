<template>

</template>

<script>
export default {
    name: 'SocialApp',
    components: { SocialPost },
    mounted() {
        // socialvue.index()
    },
    data() {
        return {
            suggestionEvent: [
                {
                    img: require('../../../assets/images/page-img/42.png'),
                    title: 'Iqonic Studio',
                    des: 'Lorem Ipsum',
                    otherImg: require('../../../assets/images/small/img-1.jpg')
                },
                {
                    img: require('../../../assets/images/page-img/42.png'),
                    title: 'Cakes & Bakes ',
                    des: 'Lorem Ipsum',
                    otherImg: require('../../../assets/images/small/img-2.jpg')
                }
            ],
            event: [
                {
                    img: require('../../../assets/images/page-img/s4.jpg'),
                    heading: 'Web Workshop',
                    time: '1 hour ago'
                },
                {
                    img: require('../../../assets/images/page-img/s5.jpg'),
                    heading: 'Fun Events and Festivals',
                    time: '4 hour ago'
                }
            ],
            user: {
                background: require('../../../assets/images/page-img/profile-bg1.jpg'),
                profile: require('../../../assets/images/user/11.png'),
                name: 'Nik Jone',
                role: ' - Web designer',
                about: 'Lorem ipsum dolor sit amet, contur adipiscing elit.',
                email: 'nikjone@demoo.com',
                phone: '001 2351 256 12',
                location: 'USA',
                careated_date: '07 Jan 2020'
            },
            socialPosts: Posts,
            story: [
                { title: '財金版', image: require('../../../assets/images/badges/01.png') },
                { title: '體育版', image: require('../../../assets/images/badges/02.png') },
                { title: '影視版', image: require('../../../assets/images/badges/03.png') },
                { title: '科技版', image: require('../../../assets/images/badges/06.png') },
            ],
            suggestions: [
                { name: 'Anna Sthesia', mutual_friend: 'Today', image: require('../../../assets/images/user/01.jpg') },
                { name: 'Paul Molive', mutual_friend: 'Tomorrow', image: require('../../../assets/images/user/02.jpg') }
            ],
            news: [
                { description: 'there is a meetup in your city on friday at 19:00.<a href="#">see details</a>' },
                { description: '20% off coupon on selected items at pharmaprix' }
            ],
            twitterFeed: [
                {
                    image: require('../../../assets/images/page-img/42.png'),
                    name: 'UI/Ux Designer',
                    description: 'Creativity Design'
                },
                {
                    image: require('../../../assets/images/page-img/43.png'),
                    name: 'Marketing',
                    description: 'Accounting'
                },
                {
                    image: require('../../../assets/images/page-img/44.png'),
                    name: 'Web Developer',
                    description: 'uniq Concept'
                },
                {
                    image: require('../../../assets/images/page-img/45.png'),
                    name: 'Latest News',
                    description: 'Line information'
                }
            ],
            recentPages: [
                {
                    image: require('../../../assets/images/page-img/46.png'),
                    name: 'Food town'
                },
                {
                    image: require('../../../assets/images/page-img/47.png'),
                    name: 'Touro Univercity'
                },
                {
                    image: require('../../../assets/images/page-img/48.jpg'),
                    name: 'Moviehouse & Eatery'
                },
                {
                    image: require('../../../assets/images/page-img/48.jpg'),
                    name: 'Coffee + Crisp'
                }
            ]
        }
    },
    methods: {
        addPost(post) {
            this.socialPosts.unshift(post)
        },
        toggleFollowing(index) {
            const following = this.story[0].following[index];
            following.following = !following.following;
        }
    }
}
</script>

<style lang="less"></style>