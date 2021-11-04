import React from "react";
import s from './Friends.module.css'
import {FriendType, initialStateType} from "../../redux/friendsReducer";

type FriendsPropsType = {
    friendsPage: initialStateType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setFriends: (friends: Array<FriendType>) => void
}
export const Friends: React.FC<FriendsPropsType> = ({friendsPage, follow, unfollow, setFriends}) => {

   if (friendsPage.friends.length === 0) {
        setFriends([
            {
                id: 1,
                cover: 'https://us.123rf.com/450wm/vejaa/vejaa1907/vejaa190700390/128765048-colorful-sports-court-background-top-view-to-red-and-blue-field-rubber-ground-with-white-and-yellow-.jpg?ver=6',
                photoUrl: 'https://s3.amazonaws.com/paxful/avatar/2019/05/60098620c27c08a70f55fdd3efb38faf.jpg?v=1593613146',
                follow: true,
                nickname: 'Sophia Pang',
                profession: "@designer",
                status: "Lorem Ipsum is simply dummy text of the",
                location: {country: 'Belarus', city: 'Minsk'}
            },
            {
                id: 2,
                cover: 'https://yoors-media-thumbs-adsfairbv.netdna-ssl.com/32114/blog/leestip-1484335910.jpg',
                photoUrl: 'https://framacolibri.org/user_avatar/framacolibri.org/rigelk/200/942_1.png',
                follow: true,
                nickname: 'Jonathon Thompson',
                profession: "@developer",
                status: "Lorem Ipsum is simply dummy text of the",
                location: {country: 'Poland', city: 'Warsaw'}
            },
            {
                id: 3,
                cover: 'https://alaxon.co.il/wp-content/uploads/2020/07/WaterPolo-1500x500-1-450x150.jpg',
                photoUrl: 'https://sun6-23.userapi.com/s/v1/if1/59XuAdI4oWeF2pEhr5dIBJgGLezW7WvamrHqSTe2DzYRPihgcAg7n0Gso_5YGOZBqdTul46s.jpg?size=200x200&quality=96&crop=1080,178,704,704&ava=1',
                follow: false,
                nickname: 'Brian Walton',
                profession: "@tester",
                status: "Lorem Ipsum is simply dummy text of the",
                location: {country: 'Canada', city: 'Ottawa'}
            },
            {
                id: 4,
                cover: 'https://alaxon.co.il/wp-content/uploads/2018/12/Donuts-1500x500-450x150.jpg',
                photoUrl: 'https://sun1-97.userapi.com/s/v1/ig2/Hz89U9iY6tyh310FrZfSt7S27oiWPGU8vuqpKQbQO5BavVIcSbzkInTkZhvR-vQffYUabPIpE2KsMQxPZ1mmN0c8.jpg?size=200x0&quality=96&crop=2,2,495,495&ava=1',
                follow: false,
                nickname: 'Olivia Steward',
                profession: "@developer",
                status: "Lorem Ipsum is simply dummy text of the",
                location: {country: 'Spain', city: 'Madrid'}
            },
        ])
    }

    const changeFollowHandler = (userId: number, followStatus: boolean) => {
        followStatus ? unfollow(userId) : follow(userId)
    }

    return (
        <>
            <div className={s.coverForBlock}>
                <img src='https://pbs.twimg.com/profile_banners/1330958413988302851/1611531284/1500x500'/>
                <div className={s.label}>Friend lists</div>
            </div>


            {friendsPage.friends.map(f => <span key={f.id}>
                <span className={s.container}>

                    <div className={s.blockItem}>

                        <img src={f.cover} className={s.coverForItem} alt='cover'/>
                        <img src={f.photoUrl} className={s.avatar} alt='avatar'/>
                        <button onClick={() => changeFollowHandler(f.id, f.follow)}>
                            {f.follow ? 'Follow' : 'Unfollow'}
                        </button>

                        <span className={s.info}>
                            <div className={s.name}>{f.nickname}</div>
                            <div>{f.profession}</div>
                            <div className={s.status}>{f.status}</div>
                        </span>

                    </div>

                </span>
            </span>)}

        </>
    )
}