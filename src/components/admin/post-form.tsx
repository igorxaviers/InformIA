"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Save, Plus, X } from "lucide-react";
import { getAuthors, createAuthor, Author } from "@/services/authors";
import { getTags, createTag, Tag } from "@/services/tags";
import { createPost } from "@/services/posts";

export default function PostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [topic, setTopic] = useState("");
  
  // Data State
  const [authors, setAuthors] = useState<Author[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  
  // UI State for creation
  const [isCreatingAuthor, setIsCreatingAuthor] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState("");
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    summary: "",
    author_id: "",
    selectedTags: [] as string[], // Array of Tag IDs
    seo_title: "",
    seo_description: "",
    hero_image_url: "",
    published_at: "",
    status: "draft",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [authorsData, tagsData] = await Promise.all([
        getAuthors(),
        getTags()
      ]);
      setAuthors(authorsData);
      setTags(tagsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleCreateAuthorClick = async () => {
    if (!newAuthorName) return;
    try {
      const newAuthor = await createAuthor(newAuthorName);
      setAuthors([...authors, newAuthor]);
      setFormData(prev => ({ ...prev, author_id: newAuthor.id }));
      setIsCreatingAuthor(false);
      setNewAuthorName("");
    } catch (error) {
      alert("Failed to create author");
    }
  };

  const handleCreateTagClick = async () => {
    if (!newTagName) return;
    try {
      const slug = newTagName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const newTag = await createTag(newTagName, slug);
      
      setTags([...tags, newTag]);
      setFormData(prev => ({ 
        ...prev, 
        selectedTags: [...prev.selectedTags, newTag.id] 
      }));
      setIsCreatingTag(false);
      setNewTagName("");
    } catch (error) {
      alert("Failed to create tag");
    }
  };

  const handleGenerate = async () => {
    if (!topic) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      
      if (!response.ok) throw new Error("Generation failed");
      
      const data = await response.json();
      
      // Match generated tags with existing tags
      const matchedTagIds = data.tags.map((tagName: string) => {
        const existing = tags.find(t => t.name.toLowerCase() === tagName.toLowerCase());
        return existing ? existing.id : null;
      }).filter(Boolean) as string[];

      setFormData((prev) => ({
        ...prev,
        title: data.title,
        slug: data.slug,
        content: data.content,
        summary: data.summary,
        selectedTags: matchedTagIds,
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        hero_image_url: data.hero_image_url || "",
      }));
    } catch (error) {
      console.error("Error generating post:", error);
      alert("Failed to generate post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await createPost({
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        summary: formData.summary,
        author_id: formData.author_id || null,
        seo_title: formData.seo_title,
        seo_description: formData.seo_description,
        hero_image_url: formData.hero_image_url,
        published_at: formData.published_at || null,
        status: formData.status,
      }, formData.selectedTags);
      
      alert("Post created successfully!");
      // Reset form or redirect could go here
    } catch (error: any) {
      alert(`Error saving post: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleTag = (tagId: string) => {
    setFormData(prev => {
      const newTags = prev.selectedTags.includes(tagId)
        ? prev.selectedTags.filter(id => id !== tagId)
        : [...prev.selectedTags, tagId];
      return { ...prev, selectedTags: newTags };
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          AI Blog Generator
        </h2>
        <div className="flex gap-4 items-end bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Topic or Prompt
            </label>
            <Input
              placeholder="Ex: The future of AI in web development..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-white dark:bg-zinc-900"
            />
          </div>
          <Button 
            onClick={handleGenerate} 
            disabled={isLoading || !topic}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate with AI
              </>
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <Input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Author & Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Author</label>
              {!isCreatingAuthor ? (
                <button 
                  type="button"
                  onClick={() => setIsCreatingAuthor(true)}
                  className="text-xs text-blue-600 hover:underline flex items-center"
                >
                  <Plus className="w-3 h-3 mr-1" /> New
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={() => setIsCreatingAuthor(false)}
                  className="text-xs text-red-600 hover:underline flex items-center"
                >
                  <X className="w-3 h-3 mr-1" /> Cancel
                </button>
              )}
            </div>
            
            {isCreatingAuthor ? (
              <div className="flex gap-2">
                <Input 
                  value={newAuthorName}
                  onChange={(e) => setNewAuthorName(e.target.value)}
                  placeholder="Author Name"
                  className="h-10"
                />
                <Button type="button" onClick={handleCreateAuthorClick} size="sm">Add</Button>
              </div>
            ) : (
              <select
                name="author_id"
                value={formData.author_id}
                onChange={handleChange}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select an author...</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Published At</label>
            <Input
              type="datetime-local"
              name="published_at"
              value={formData.published_at}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Tags</label>
            {!isCreatingTag ? (
              <button 
                type="button"
                onClick={() => setIsCreatingTag(true)}
                className="text-xs text-blue-600 hover:underline flex items-center"
              >
                <Plus className="w-3 h-3 mr-1" /> New Tag
              </button>
            ) : (
              <button 
                type="button"
                onClick={() => setIsCreatingTag(false)}
                className="text-xs text-red-600 hover:underline flex items-center"
              >
                <X className="w-3 h-3 mr-1" /> Cancel
              </button>
            )}
          </div>

          {isCreatingTag && (
            <div className="flex gap-2 mb-2 max-w-xs">
              <Input 
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Tag Name"
                className="h-9"
              />
              <Button type="button" onClick={handleCreateTagClick} size="sm">Add</Button>
            </div>
          )}

          <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-zinc-50 dark:bg-zinc-900/50 min-h-[3rem]">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  formData.selectedTags.includes(tag.id)
                    ? "bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                }`}
              >
                {tag.name}
              </button>
            ))}
            {tags.length === 0 && <span className="text-sm text-zinc-400">No tags available. Create one!</span>}
          </div>
        </div>

        {/* Content & Summary */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Summary</label>
          <Textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content (HTML)</label>
          <Textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={15}
            className="font-mono text-sm"
          />
        </div>

        {/* Images & SEO */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Images & SEO</h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Hero Image URL</label>
              <Input
                name="hero_image_url"
                value={formData.hero_image_url}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">SEO Title</label>
              <Input
                name="seo_title"
                value={formData.seo_title}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">SEO Description</label>
              <Textarea
                name="seo_description"
                value={formData.seo_description}
                onChange={handleChange}
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-6">
          <Button type="submit" disabled={isSaving} size="lg">
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Post
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
