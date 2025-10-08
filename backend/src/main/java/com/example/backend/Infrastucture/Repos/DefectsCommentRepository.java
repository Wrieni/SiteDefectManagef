package com.example.backend.Infrastucture.Repos;

import com.example.backend.Domain.DefectsComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DefectsCommentRepository extends JpaRepository<DefectsComment, Integer> {
}
