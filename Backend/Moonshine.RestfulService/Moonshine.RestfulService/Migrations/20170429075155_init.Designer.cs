using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Moonshine.RestfulService.DA;

namespace Moonshine.RestfulService.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20170429075155_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Moonshine.RestfulService.DA.Entities.Answers", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("OptionName");

                    b.Property<int>("OptionNumber");

                    b.Property<Guid>("QuestionId");

                    b.HasKey("Id");

                    b.ToTable("Answer");
                });

            modelBuilder.Entity("Moonshine.RestfulService.DA.Entities.Questions", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("MaxDescription");

                    b.Property<string>("MinDescription");

                    b.Property<string>("Question");

                    b.Property<string>("QuestionDescription");

                    b.Property<int>("QuestionNumber");

                    b.Property<int>("Range");

                    b.Property<Guid>("SurveyId");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.ToTable("Question");
                });

            modelBuilder.Entity("Moonshine.RestfulService.DA.Entities.Results", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("QuestionId");

                    b.Property<string>("SelectedResult");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.ToTable("Result");
                });

            modelBuilder.Entity("Moonshine.RestfulService.DA.Entities.Survey", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Survey");
                });

            modelBuilder.Entity("Moonshine.RestfulService.DA.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("User");
                });
        }
    }
}
