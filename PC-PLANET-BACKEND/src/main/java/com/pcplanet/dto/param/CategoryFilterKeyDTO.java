package com.pcplanet.dto.param;

import com.pcplanet.dto.FilterPropertyDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CategoryFilterKeyDTO {
    private Integer id;
    private String name;
    private List<FilterPropertyDTO> filterProperties;
}
