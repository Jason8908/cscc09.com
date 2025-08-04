import { injectContentFiles } from "@analogjs/content";
import { Component, Input } from "@angular/core";
import { ProjectAttributes } from "../interfaces/file-attributes";

import { RouterLink } from "@angular/router";
import { RouteMeta } from "@analogjs/router";
import { getRouteMeta } from "../meta/route-meta";
import { environment } from "../../environments/environment";

export const routeMeta: RouteMeta = getRouteMeta({
  partialTitle: "Projects",
  description: `Previous projects completed by students who have taken ${environment.courseCode} in the past.`,
});

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: "app-project-item",
  styles: [
    `
      .project-card {
        background: rgba(226, 232, 240, 0.04);
        border: 1px solid rgba(226, 232, 240, 0.12);
        border-radius: 8px;
        padding: 1.5em;
        text-decoration: none;
        color: inherit;
        transition: all 0.2s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
      }

      .project-card:hover {
        background: rgba(226, 232, 240, 0.08);
        border-color: rgba(226, 232, 240, 0.2);
        transform: translateY(-1px);
      }

      .project-title {
        font-size: 1.25em;
        font-weight: 600;
        margin-bottom: 0.5em;
        color: #f8fafc;
        line-height: 1.3;
      }

      .project-group-name {
        font-size: 11px;
        background-color: rgba(66, 153, 225, 0.2);
        color: #90cdf4;
        padding: 3px 8px;
        border-radius: 4px;
        display: inline-block;
        margin-bottom: 1em;
        align-self: flex-start;
        font-weight: 500;
        letter-spacing: 0.5px;
      }

      .project-description {
        font-size: 14px;
        color: #a0aec0;
        line-height: 1.5;
        margin-bottom: 1em;
      }

      .project-members {
        margin-top: auto;
        padding-top: 1em;
        border-top: 1px solid rgba(226, 232, 240, 0.08);
      }

      .members-label {
        font-size: 10px;
        color: #718096;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.5em;
        font-weight: 500;
      }

      .members-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4em;
      }

      .member-tag {
        font-size: 10px;
        background-color: rgba(226, 232, 240, 0.08);
        color: #a0aec0;
        padding: 2px 6px;
        border-radius: 3px;
        border: 1px solid rgba(226, 232, 240, 0.12);
        font-weight: 400;
      }
    `,
  ],
  template: `
    @if (project) {
      <a [routerLink]="'/projects/' + slug" class="project-card">
        <div class="project-group-name">
          {{ project.groupName }}
        </div>
        <div class="project-title">{{ project.title }}</div>
        <div class="project-description">
          {{ truncateDescription(project.description) }}
        </div>
        @if (project.groupMembers && project.groupMembers.length > 0) {
          <div class="project-members">
            <div class="members-label">Team Members</div>
            <div class="members-list">
              @for (member of project.groupMembers; track member) {
                <span class="member-tag">{{ member }}</span>
              }
            </div>
          </div>
        }
      </a>
    }
  `,
})
export class ProjectItemComponent {
  @Input() project?: ProjectAttributes;
  @Input() slug?: string;
  @Input() descriptionLimit: number = 150;

  truncateDescription(description: string): string {
    if (description.length <= this.descriptionLimit) {
      return description;
    }
    return description.substring(0, this.descriptionLimit).trim() + "...";
  }
}

@Component({
  standalone: true,
  imports: [ProjectItemComponent],
  styles: [
    `
      .projects-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1em;
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2em;
        margin-top: 2em;
      }

      @media (max-width: 768px) {
        .projects-grid {
          grid-template-columns: 1fr;
          gap: 1.5em;
        }
      }

      @media (max-width: 480px) {
        .container {
          padding: 0 0.5em;
        }

        .projects-grid {
          gap: 1em;
        }
      }
    `,
  ],
  template: `
    <div class="container">
      <header>
        <h1>Previous Projects</h1>
        <p>
          This page is a collection of projects that have been completed by
          students in the past. If you want your project featured on this page,
          please head to the GitHub repository for the site and submit a pull
          request following the guidelines in the README.md.
        </p>
      </header>
      <div class="projects-container">
        <div class="projects-grid">
          @for (project of projects; track project) {
            <app-project-item
              [slug]="project.slug"
              [project]="project.attributes"
            ></app-project-item>
          }
        </div>
      </div>
    </div>
  `,
})
export default class ProjectsPage {
  readonly projects = injectContentFiles<ProjectAttributes>((contentFile) =>
    contentFile.filename.includes("/src/content/projects/"),
  );
}
