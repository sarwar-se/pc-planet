package com.pcplanet.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FilterKeyDTO {
    private Integer id;
    private String name;
    private List<FilterPropertyDTO> filterProperties;
}
