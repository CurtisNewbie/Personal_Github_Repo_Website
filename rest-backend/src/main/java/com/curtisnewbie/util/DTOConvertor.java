package com.curtisnewbie.util;

import java.util.ArrayList;
import java.util.List;

import com.curtisnewbie.dto.LicenseDTO;
import com.curtisnewbie.dto.OwnerDTO;
import com.curtisnewbie.dto.RepoDTO;
import com.curtisnewbie.persistence.License;
import com.curtisnewbie.persistence.Owner;
import com.curtisnewbie.persistence.Repository;

/**
 * ------------------------------------
 * <p>
 * Author: Yongjie Zhuang
 * <p>
 * ------------------------------------
 * <p>
 * Class that provides methods to convert entities to DTO objects
 * </p>
 */
public class DTOConvertor {

    /**
     * Convert {@code Repository} to {@code RepoDTO}
     * 
     * @param r {@code Repository}
     * @return {@code RepoDTO}
     */
    public static RepoDTO toDto(Repository r) {
        RepoDTO d = new RepoDTO();
        d.id = r.getId();
        d.name = r.getName();
        d.full_name = r.getFullName();
        d.owner = toDto(r.getOwner());
        d.description = r.getDescription();
        d.created_at = r.getCreated_at();
        d.updated_at = r.getUpdated_at();
        d.pushed_at = r.getPushed_at();
        d.stargazers_count = r.getStargazers_count();
        d.license = toDto(r.getLicense());
        d.language = r.getLanguage();
        return d;
    }

    /**
     * Convert {@code Owner} to {@code OwnerDTO}
     * 
     * @param o {@code Owner}
     * @return {@code OwnerDTO}
     */
    public static OwnerDTO toDto(Owner o) {
        OwnerDTO d = new OwnerDTO();
        d.login = o.getLoginName();
        d.avatar_url = o.getAvatar_url();
        d.html_url = o.getHtml_url();
        return d;
    }

    /**
     * Conver {@code License} to {@code LicenseDTO}
     * 
     * @param l {@code License}
     * @return {@code LicenseDTO}
     */
    public static LicenseDTO toDto(License l) {
        LicenseDTO d = new LicenseDTO();
        d.name = l.getName();
        return d;
    }

    /**
     * Convert a list of {@code Repository}(s) to a list of {@code RepoDTO}
     * 
     * @param list a list of {@code Repository}(s)
     * @return a list of {@code RepoDTO}
     */
    public static List<RepoDTO> convert(List<Repository> list) {
        List<RepoDTO> dtos = new ArrayList<>();
        for (var t : list) {
            dtos.add(toDto(t));
        }
        return dtos;
    }
}