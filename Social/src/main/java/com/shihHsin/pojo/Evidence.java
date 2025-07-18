package com.shihHsin.pojo;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.shihHsin.Dto.EvidenceUploadDto;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class Evidence {
    @TableId(value = "id", type = IdType.AUTO)
    private int id;                    // 自動遞增的主鍵
    private int verificationId;        // 驗證 ID
    private String description;        // 描述
    private Boolean chained;
    private int userId;                // 提供者 ID
//    private int vote_count;            // 點讚數
    private String transactionHash;    // 交易哈希
    private Timestamp evidenceDate; // 證據日期

    public Evidence() {
    }

    public Evidence(EvidenceUploadDto evidenceUploadDto) {
        this.id = evidenceUploadDto.getId();
        this.verificationId = evidenceUploadDto.getVerificationId();
        this.chained = evidenceUploadDto.isChained();
        this.description = evidenceUploadDto.getDescription();
        this.userId = evidenceUploadDto.getUserId();
        this.transactionHash = evidenceUploadDto.getTransactionHash();
        this.evidenceDate = evidenceUploadDto.getEvidenceDate();
    }
}
