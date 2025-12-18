package com.choco.backend.repository;

import com.choco.backend.model.CustomBox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CustomBoxRepository extends JpaRepository<CustomBox, Long> {
    List<CustomBox> findByUserId(Long userId);
    List<CustomBox> findByStatus(String status);
}