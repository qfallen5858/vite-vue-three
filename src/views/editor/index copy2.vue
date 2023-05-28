<template>
  <div class="container-fluid">
    <div class="row main-row">
        <!-- Left Column -->
        <div class="col-xs-3 sidebar">
            <!-- Main Navigation -->
            <ul class="nav nav-sidebar">
                <li id="floorplan_tab">
                    <a href="#">
                        Edit FloorPlan
                        <span class="glyphicon glyphicon-chevron-right pull-right"></span>
                    </a>
                </li>
                <li id="design_tab">
                    <a href="#">
                        Design
                        <span class="glyphicon glyphicon-chevron-right pull-right"></span>
                    </a>
                </li>
                <li id="items_tab">
                    <a href="#">
                        Add Items
                        <span class="glyphicon glyphicon-chevron-right pull-right"></span>
                    </a>
                </li>
            </ul>
            <hr>
        </div>
        <!-- End Left Column -->

        <!-- Right Column -->
        <div class="col-xs-9 main">
            <div id="floorplanner">
                <canvas id="floorplanner-canvas">

                </canvas>
            </div>
        </div>
        <!-- End Right Column -->
    </div>
  </div>
</template>

<script setup lang="ts">
import {NSpace} from "naive-ui"
</script>

<style></style>
