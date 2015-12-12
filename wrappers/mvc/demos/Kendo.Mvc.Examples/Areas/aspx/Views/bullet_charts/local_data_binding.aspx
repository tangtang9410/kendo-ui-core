﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
Inherits="System.Web.Mvc.ViewPage<Kendo.Mvc.Examples.Models.BulletChartLocalDataViewModel>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
<style>
   .demo-section {
    text-align: center;
   }
   .k-chart {
       display: inline-block;
   }
</style>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section k-content wide">
    <%= Html.Kendo().Chart(Model.mmHg)
            .Name("chart-mmHg")
            .Legend(legend => legend
                .Visible(false)
            )
            .Series(series => {
                series.VerticalBullet(s => s.Current, s => s.Target).Color("#ffffff").Target(t => t.Color("#ffffff"));
            })
            .CategoryAxis(axis => axis
                .MajorGridLines(lines => lines.Visible(false))
                .MajorTicks(lines => lines.Visible(false))
                .Title(title => title.Text("mmHg"))
                .Categories(model => model.Category)
            )
            .ValueAxis(axis => axis
                .Numeric()
                .Min(715)
                .Max(790)
                .MinorTicks(lines => lines.Visible(true))
                .MajorGridLines(lines => lines.Visible(false))
                .PlotBands(bands => {
                    bands.Add().From(715).To(752).Color("#2890cc").Opacity(0.6);
                    bands.Add().From(752).To(772).Color("#2890cc").Opacity(0.8);
                    bands.Add().From(772).To(790).Color("#2890cc").Opacity(0.6);
                })
            )
            .Tooltip(tooltip => tooltip
                .Visible(true)
                .Shared(true)
                .Template("Maximum: #= value.target # <br /> Average: #= value.current #")
            )
    %>

    <%= Html.Kendo().Chart(Model.hPa)
            .Name("chart-hpa")
            .Legend(legend => legend
                .Visible(false)
            )
            .Series(series => {
                series.VerticalBullet(s => s.Current, s => s.Target).Color("#ffffff").Target(t => t.Color("#ffffff"));
            })
            .CategoryAxis(axis => axis
                .MajorGridLines(lines => lines.Visible(false))
                .MajorTicks(lines => lines.Visible(false))
                .AxisCrossingValue(14)
                .Title(title => title.Text("hPa"))
                .Categories(model => model.Category)
            )
            .ValueAxis(axis => axis
                .Numeric()
                .Min(955)
                .Max(1050)
                .MinorTicks(lines => lines.Visible(true))
                .MajorGridLines(lines => lines.Visible(false))
                .PlotBands(bands => {
                    bands.Add().From(955).To(1002).Color("#8ebc00").Opacity(0.6);
                    bands.Add().From(1002).To(1027).Color("#8ebc00").Opacity(0.8);
                    bands.Add().From(1027).To(1050).Color("#8ebc00").Opacity(0.6);
                })
            )
            .Tooltip(tooltip => tooltip
                .Visible(true)
                .Shared(true)
                .Template("Maximum: #= value.target # <br /> Average: #= value.current #")
            )
    %>
</div>
</asp:Content>
