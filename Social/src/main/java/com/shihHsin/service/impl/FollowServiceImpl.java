package com.shihHsin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.shihHsin.mapper.FollowMapper;
import com.shihHsin.pojo.Follow;
import com.shihHsin.service.IFollowService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowServiceImpl extends ServiceImpl<FollowMapper, Follow> implements IFollowService {
    @Resource
    private FollowMapper followMapper;

    @Override
    public void followUser(Integer followerId, Integer followeeId) {
        Follow follow = new Follow();
        follow.setFollowerId(followerId);
        follow.setFolloweeId(followeeId);
        followMapper.insert(follow);
    }

    @Override
    public void unfollowUser(Integer followerId, Integer followeeId) {
        followMapper.unfollow(followerId, followeeId);
    }
    @Override
    public List<Follow> getFollowers(Integer followeeId) {
        return followMapper.findByFolloweeId(followeeId);
    }
    @Override
    public List<Follow> getFollowing(Integer followerId) {
        return followMapper.findByFollowerId(followerId);
    }

    @Override
    public boolean getMyFollowed(Integer id, Integer userId) {
//        if(id.equals(userId)) return -1;
        LambdaQueryWrapper<Follow> queryWrapper = new LambdaQueryWrapper<>();
        Follow follow = followMapper.selectOne(queryWrapper.eq(Follow::getFollowerId, userId).eq(Follow::getFolloweeId, id));
        return follow != null;
    }
}
