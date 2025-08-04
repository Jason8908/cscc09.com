# CSCC09 - Programming on the Web

This is the source code for the CSCC09 course website.

Enjoy the course!

## 🚀 Quick start

Prerequisites: Node 18+ and Yarn 1.22+ installed.

1.  **Install dependencies and pre-commit hooks**

    ```shell
    cd cscc09.com/
    yarn install
    npx simple-git-hooks
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    yarn dev
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:5173!

## 📝 Contributing Your Project

Want to showcase your project on this site? Follow these steps to add your project to the collection!

### Step 1: Fork the Repository

1. Go to the [CSCC09 website repository](https://github.com/your-username/cscc09.com)
2. Click the "Fork" button in the top right corner
3. This creates a copy of the repository under your GitHub account

### Step 2: Clone Your Fork

```shell
git clone https://github.com/YOUR_USERNAME/cscc09.com.git
cd cscc09.com
```

### Step 3: Create Your Project File

1. **Navigate to the projects directory:**

   ```shell
   cd src/content/projects
   ```

   > **Note:** If this directory doesn't exist (you're the first group to contribute), create it:

   ```shell
   mkdir -p src/content/projects
   ```

2. **Copy the project template:**

   ```shell
   cp ../../../templates/project-template.md your-project-name.md
   ```

3. **Edit your project file:**
   - Replace `<Your Group's Name>` with your actual group name
   - Replace `<Your Project Name>` with your project title
   - Replace `<Your Description>` with a brief description (max 150 characters for the card view)
   - Update the `groupMembers` list with your team members' names
   - Write a detailed description in the markdown section below the frontmatter

### File Naming Requirements

**Important:** The filename you choose will become the URL slug for your project page. For example:

- `my-awesome-app.md` → URL: `/projects/my-awesome-app`

**Best practices:**

- Use descriptive, lowercase names
- Separate words with hyphens
- Keep it concise but meaningful
- Avoid numbers and other special characters

### Step 4: Project File Structure

Your project file should look like this:

```markdown
---
groupName: Team Awesome
title: My Amazing Web App
description: A responsive web application built with modern technologies
groupMembers:
  - Alice Johnson
  - Bob Smith
  - Carol Davis
---

Here you can write a longer description about your project. You can include [links](https://github.com/your-repo) to your GitHub repositories or live deployed versions of your project.

## Features

- Feature 1
- Feature 2
- Feature 3

## Technologies Used

- HTML5
- CSS3
- JavaScript
```

### Step 5: Test Your Changes

1. **Start the development server:**

   ```shell
   yarn dev
   ```

2. **Navigate to the projects page** at `http://localhost:5173/projects`
3. **Check that your project appears** in the grid
4. **Click on your project** to verify the individual page displays correctly

### Step 6: Commit and Push

```shell
git add src/content/projects/your-project-name.md
git commit -m "feat: added project <your project name> to projects page</your>"
git push origin main
```

### Step 7: Create a Pull Request

1. Go to your forked repository on GitHub
2. Click "Compare & pull request"
3. **Write a descriptive title** like "Add project: [Your Project Name]"
4. **Add a description** explaining your project:

   ```
   ## Project Description
   Brief description of what your project does

   ## Team Members
   - Alice Johnson
   - Bob Smith
   - Carol Davis

   ## Technologies Used
   - HTML5, CSS3, JavaScript
   - Any other relevant technologies
   ```

5. Click "Create pull request"

### Step 8: Wait for Review

Your pull request will be reviewed and merged if everything looks good! Once merged, your project will appear on the live site.

## 📋 Project Guidelines

- **Keep descriptions concise** - The card view shows max 150 characters
- **Include all team members** - Make sure everyone gets credit
- **Add relevant links** - GitHub repos, live demos, etc.
- **Use clear, descriptive titles** - Make it easy to understand what your project does
- **Test your changes locally** - Make sure everything works before submitting

Happy contributing! 🎉
