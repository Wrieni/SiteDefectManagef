package com.example.backend.Domain;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false, length = 50)
    private String title;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "status", nullable = false, length = 30)
    private String status;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at")
    private Instant createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_manager")
    private User manager;

    @Column(name = "deadline_time")
    private Instant deadlineTime;

    @Column(name = "comment", length = 100)
    private String comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_executor")
    private User executor;

    @OneToMany(mappedBy = "idProject")
    private Set<Defect> defects = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getIdManager() {
        return manager.getId();
    }

    public void setIdManager(User manager) {
        if (manager != null) {
            this.manager = manager;
        }
        else{
            this.manager = null;}
    }

    public Instant getDeadlineTime() {
        return deadlineTime;
    }

    public void setDeadlineTime(Instant deadlineTime) {
        this.deadlineTime = deadlineTime;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getIdExecutor() {
        return executor.getId();
    }

    public void setIdExecutor(User executor) {
        if (executor != null) {
            this.executor = executor;
        }
        else{
            this.executor = null;
        }
    }

    public Set<Defect> getDefects() {
        return defects;
    }

    public void setDefects(Set<Defect> defects) {
        this.defects = defects;
    }

}