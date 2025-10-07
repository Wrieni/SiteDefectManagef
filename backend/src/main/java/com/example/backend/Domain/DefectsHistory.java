package com.example.backend.Domain;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Entity
@Table(name = "defects_history")
public class DefectsHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_defect")
    private Defect idDefect;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user")
    private User idUser;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "old_value", length = Integer.MAX_VALUE)
    private String oldValue;

    @Column(name = "new_value", length = Integer.MAX_VALUE)
    private String newValue;

    @ColumnDefault("now()")
    @Column(name = "changed_at")
    private Instant changedAt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Defect getIdDefect() {
        return idDefect;
    }

    public void setIdDefect(Defect idDefect) {
        this.idDefect = idDefect;
    }

    public User getIdUser() {
        return idUser;
    }

    public void setIdUser(User idUser) {
        this.idUser = idUser;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getOldValue() {
        return oldValue;
    }

    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public String getNewValue() {
        return newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }

    public Instant getChangedAt() {
        return changedAt;
    }

    public void setChangedAt(Instant changedAt) {
        this.changedAt = changedAt;
    }

}