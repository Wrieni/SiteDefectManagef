package com.example.backend.Domain;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "defects")
public class Defect {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false, length = 50)
    private String title;

    @Column(name = "description", length = 250)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_project")
    private Project idProject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_executor")
    private User idExecutor;

    @Column(name = "priority")
    private Integer priority;

    @ColumnDefault("'Новая'")
    @Column(name = "status", nullable = false, length = 30)
    private String status;

    @ColumnDefault("now()")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @OneToMany(mappedBy = "idDefect")
    private Set<DefectsAttachment> defectsAttachments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idDefect")
    private Set<DefectsComment> defectsComments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idDefect")
    private Set<DefectsHistory> defectsHistories = new LinkedHashSet<>();

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

    public Project getIdProject() {
        return idProject;
    }

    public void setIdProject(Project idProject) {
        this.idProject = idProject;
    }

    public User getIdExecutor() {
        return idExecutor;
    }

    public void setIdExecutor(User idExecutor) {
        this.idExecutor = idExecutor;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
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

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<DefectsAttachment> getDefectsAttachments() {
        return defectsAttachments;
    }

    public void setDefectsAttachments(Set<DefectsAttachment> defectsAttachments) {
        this.defectsAttachments = defectsAttachments;
    }

    public Set<DefectsComment> getDefectsComments() {
        return defectsComments;
    }

    public void setDefectsComments(Set<DefectsComment> defectsComments) {
        this.defectsComments = defectsComments;
    }

    public Set<DefectsHistory> getDefectsHistories() {
        return defectsHistories;
    }

    public void setDefectsHistories(Set<DefectsHistory> defectsHistories) {
        this.defectsHistories = defectsHistories;
    }

}