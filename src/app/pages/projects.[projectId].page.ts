import {
  ContentFile,
  MarkdownComponent,
  injectContent,
} from "@analogjs/content";
import { Component, inject } from "@angular/core";
import { ProjectAttributes } from "../interfaces/file-attributes";
import { Meta, Title } from "@angular/platform-browser";
import { getMeta } from "../meta/route-meta";

@Component({
  standalone: true,
  imports: [MarkdownComponent],
  styles: [
    `
      .container {
        margin-top: 3em;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
        padding: 0 1em;
      }

      h1 {
        font-size: 2.5em;
        font-weight: 700;
        margin-bottom: 0.5em;
        color: #f8fafc;
        line-height: 1.2;
      }

      .project-header {
        padding: 2em;
        padding-bottom: 0;
      }

      .project-group {
        font-size: 12px;
        background-color: rgba(66, 153, 225, 0.2);
        color: #90cdf4;
        padding: 4px 12px;
        border-radius: 6px;
        display: inline-block;
        margin-bottom: 1em;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      .project-description {
        font-size: 18px;
        color: #a0aec0;
        margin: 1.5em 0;
        line-height: 1.6;
        font-weight: 400;
      }

      .project-members {
        margin-top: 2em;
        padding-top: 1em;
        border-top: 1px solid rgba(226, 232, 240, 0.16);
      }

      .members-title {
        font-size: 14px;
        font-weight: 600;
        color: #f8fafc;
        margin-bottom: 1em;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .members-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75em;
      }

      .member-tag {
        font-size: 13px;
        background-color: rgba(226, 232, 240, 0.08);
        color: #a0aec0;
        padding: 6px 12px;
        border-radius: 6px;
        border: 1px solid rgba(226, 232, 240, 0.16);
        font-weight: 500;
      }

      .project-content {
        margin-top: 2em;
        line-height: 1.7;
      }

      .project-content h2 {
        font-size: 1.5em;
        font-weight: 600;
        color: #f8fafc;
        margin: 1.5em 0 0.5em 0;
      }

      .project-content h3 {
        font-size: 1.25em;
        font-weight: 600;
        color: #e2e8f0;
        margin: 1.25em 0 0.5em 0;
      }

      .project-content p {
        color: #a0aec0;
        margin-bottom: 1em;
      }

      .project-content ul {
        color: #a0aec0;
        margin-bottom: 1em;
      }

      .project-content li {
        margin-bottom: 0.5em;
      }

      @media (max-width: 768px) {
        .container {
          padding: 0 0.5em;
        }

        h1 {
          font-size: 2em;
        }

        .project-header {
          padding: 1.5em;
        }
      }
    `,
  ],
  template: `
    <div class="container">
      @if (project) {
        <div class="project-header">
          <h1>{{ project.attributes.title }}</h1>
          <div class="project-group">
            {{ project.attributes.groupName }}
          </div>
          <div class="project-description">
            {{ project.attributes.description }}
          </div>
        </div>
        @if (
          project.attributes.groupMembers &&
          project.attributes.groupMembers.length > 0
        ) {
          <div class="project-members">
            <div class="members-title">Team Members</div>
            <div class="members-list">
              @for (member of project.attributes.groupMembers; track member) {
                <span class="member-tag">{{ member }}</span>
              }
            </div>
          </div>
        }
        <div class="project-content">
          <analog-markdown [content]="project.content"></analog-markdown>
        </div>
      }
    </div>
  `,
  providers: [Meta],
})
export default class ProjectComponent {
  meta = inject(Meta);
  title = inject(Title);
  project: ContentFile<ProjectAttributes | Record<string, never>> | undefined =
    undefined;

  constructor() {
    injectContent<ProjectAttributes>({
      param: "projectId",
      subdirectory: "projects",
    }).subscribe((project) => {
      this.setProject(project as ContentFile<ProjectAttributes>);
    });
  }

  setProject(project: ContentFile<ProjectAttributes>) {
    this.project = project;
    this.title.setTitle(project.attributes.title);
    const meta = getMeta({
      title: project.attributes.title,
      description: project.attributes.description,
    });
    meta.forEach((tag) => this.meta.updateTag(tag));
  }
}
