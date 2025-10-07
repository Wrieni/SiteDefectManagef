package com.example.backend.Domain;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "firstname", nullable = false, length = 50)
    private String firstname;

    @Column(name = "lastname", nullable = false, length = 50)
    private String lastname;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "hash_password", nullable = false)
    private String hashPassword;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_role")
    private Role role;

    @OneToMany(mappedBy = "idExecutor")
    private Set<Defect> defects = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idUser")
    private Set<DefectsAttachment> defectsAttachments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idUser")
    private Set<DefectsComment> defectsComments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idUser")
    private Set<DefectsHistory> defectsHistories = new LinkedHashSet<>();

    @OneToMany(mappedBy = "manager")
    private Set<Project> projects = new LinkedHashSet<>();

    @OneToMany(mappedBy = "executor")
    private Set<Project> executedProjects = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHashPassword() {
        return hashPassword;
    }

    public void setHashPassword(String hashPassword) {
        this.hashPassword = hashPassword;
    }

    public Integer getIdRole() {
        return role.getId();
    }

    public void setIdRole(Role role) {
        this.role = role;
    }

    public Set<Defect> getDefects() {
        return defects;
    }

    public void setDefects(Set<Defect> defects) {
        this.defects = defects;
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

    public Set<Project> getProjects() {
        return projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

}