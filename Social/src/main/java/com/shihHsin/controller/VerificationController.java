package com.shihHsin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.shihHsin.Dto.BoardDto;
import com.shihHsin.Dto.VerificationChainDto;
import com.shihHsin.Dto.VerificationDto;
import com.shihHsin.common.R;
import com.shihHsin.pojo.Board;
import com.shihHsin.pojo.FollowBoard;
import com.shihHsin.pojo.User;
import com.shihHsin.pojo.Verification;
import com.shihHsin.service.*;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/verification")
public class VerificationController {
    @Resource
    private IVerificationService verificationService;

    @Resource
    private IUserService userService;

    @Resource
    private IArticleService articleService;

    @Resource
    private IBoardService boardService;

    @Resource
    private IFollowBoardService followBoardService;


    @PostMapping("/submit")
    public R submitVerification(@RequestBody Verification verification) {
        log.debug("Received verification request: {}", verification);
        boolean isSaved = verificationService.save(verification);

        if (isSaved) {
            return R.success("驗證發起成功");
        } else {
            return R.error("驗證發起失敗");
        }
    }

    @GetMapping("/VerificationList")
    public R getVerificationList(@RequestParam(value = "page", required = false, defaultValue = "1") int page) {
        log.debug("Received verification list request, page: {}", page);
        int size = 4; // 每頁顯示的驗證數量
        List<Verification> verifications = verificationService.list(); // 獲取所有驗證

        // 計算開始的索引和結束的索引
        int start = (page - 1) * size;
        int end = Math.min(start + size, verifications.size());

        // 確保開始索引不超過驗證列表的大小
        if (start >= verifications.size()) {
            return R.success(new ArrayList<>()); // 如果開始索引超出範圍，返回空列表
        }

        // 根據 start 和 end 進行子列表的提取
        List<Verification> pagedVerifications = verifications.subList(start, end);

        // 將驗證轉換為 DTO
        List<VerificationDto> verificationDtos = new ArrayList<>();
        for (Verification verification : pagedVerifications) {
            VerificationDto verificationDto = new VerificationDto(verification);
            verificationDto.setUserName(userService.getUserNameById(verification.getUserId()));
            verificationDto.setTitle(articleService.getTitleById(verification.getArticleId()));
            verificationDto.setAvatar(userService.getAvatarByUserId(verification.getUserId()));
            verificationDtos.add(verificationDto);
        }

        return R.success(verificationDtos);
    }


    @RequestMapping("/myfollowboard={id}")
    public R getMyBoardList(@PathVariable("id") Integer id){
        LambdaQueryWrapper<FollowBoard> fbWrapper = new LambdaQueryWrapper<>();
        fbWrapper.eq(FollowBoard::getUserId, id);
        List<FollowBoard> fbList = followBoardService.list(fbWrapper);
        List<Integer> followboardIds = fbList.stream()
                .map(FollowBoard::getBoardId)
                .collect(Collectors.toList());

        List<BoardDto> boardDto = new ArrayList<>();
        for (Integer followboardId : followboardIds) {
            BoardDto boardDto1 = new BoardDto();
            LambdaQueryWrapper<Board> nameWrapper = new LambdaQueryWrapper<>();
            nameWrapper.eq(Board::getId, followboardId);
            String name = boardService.getOne(nameWrapper).getName();

            LambdaQueryWrapper<Board> discriptionWrapper = new LambdaQueryWrapper<>();
            discriptionWrapper.eq(Board::getId, followboardId);
            String discription = boardService.getOne(discriptionWrapper).getDescription();

            LambdaQueryWrapper<Board> logoBase64Wrapper = new LambdaQueryWrapper<>();
            logoBase64Wrapper.eq(Board::getId, followboardId);
            String logoBase64 = boardService.getOne(logoBase64Wrapper).getLogo();

            boardDto1.setName(name);
            boardDto1.setDescription(discription);
            boardDto1.setLogoBase64(logoBase64);

            boardDto.add(boardDto1);
        }
        log.debug(boardDto.toString());
        return R.success(boardDto);
    }

    //    編輯個人資料
    @PutMapping("/put")
    public R<User> updateUser (@RequestBody User user){
        log.info(user.toString());
        userService.updateById(user);
        return R.success(null);
    }

    @GetMapping("/getVerificationChainInfo")
    public R<VerificationChainDto> getVerificationChainInfo(@RequestParam(value = "id") Integer id) {
        Verification verification = verificationService.getById(id);
        VerificationChainDto verificationChainDto = new VerificationChainDto();
        verificationChainDto.setVerificationId(verification.getId());
        verificationChainDto.setTransactionHash(verification.getTransactionHash());
        verificationChainDto.setAuthorAddress(userService.getUserAddressByUserId(verification.getUserId()));
        verificationChainDto.setTitle(verification.getReason());
        verificationChainDto.setTimestamp(verification.getVerificationDate().getTime());
//        log.debug("verificationChainDto:" + verificationChainDto.toString());
        return R.success(verificationChainDto);
    }

}
