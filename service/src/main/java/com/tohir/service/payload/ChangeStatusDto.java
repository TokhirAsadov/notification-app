package com.tohir.service.payload;

import com.tohir.service.entity.enums.PPostStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChangeStatusDto {
    private String id;
    private PPostStatus status;
}
